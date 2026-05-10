# =============================================================
# Stage 1 — builder
# 호스트에서 미리 dist/ 를 만들어 놓을 필요 없이, 도커 안에서 직접 빌드한다.
#   - "코드만 있으면 어디서든 동일한 이미지가 나온다"는 도커의 재현성을 확보.
#   - CI/로컬/동료 머신 어디서든 `docker build .` 한 줄이면 끝.
# =============================================================
FROM node:24.15.0-alpine AS builder

# corepack: Node에 내장된 패키지 매니저 디스패처.
# 별도 npm install 없이 pnpm을 활성화하고 버전까지 고정한다.
#   - COREPACK_ENABLE_DOWNLOAD_PROMPT=0 : 비대화형 환경에서 다운로드 프롬프트가
#     떠 빌드가 멈추는 것을 방지(없으면 일부 환경에서 빌드가 hang 됨).
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

WORKDIR /app

# ─────────────────────────────────────────────────────────────
# 의존성 레이어 캐시 최적화:
# package.json / pnpm-lock.yaml만 먼저 복사 → install.
# 소스만 바뀌고 의존성은 그대로면 이 install 레이어가 캐시 hit이 되어
# 도커 빌드가 훨씬 빨라진다.
# ─────────────────────────────────────────────────────────────
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 소스 전체 복사 후 빌드 → /app/dist 생성
#   - package.json의 build = "tsc -b && vite build"
COPY . .
RUN pnpm build

# =============================================================
# Stage 2 — runtime (nginx)
# 최종 이미지는 nginx + 빌드 결과물 + 우리 nginx 설정만 포함.
# Node, pnpm, node_modules, 소스코드는 전혀 들어가지 않아 이미지가 작고 안전하다.
# =============================================================
FROM nginx:1.27-alpine

# ─────────────────────────────────────────────────────────────
# OCI 표준 라벨(metadata).
#   - docker inspect 시 보이고, GHCR/도커허브 일부 도구는 image.source를
#     보고 리포 링크를 자동으로 보여준다.
# ─────────────────────────────────────────────────────────────
LABEL org.opencontainers.image.source="https://github.com/dubanjjang/ieum-client"
LABEL org.opencontainers.image.description="IEUM client (static, served by nginx)"

# ─────────────────────────────────────────────────────────────
# nginx:alpine 베이스에는 데모용 default.conf가 들어 있다.
# 우리 설정으로 깔끔히 갈아끼우려고 먼저 지우고 그 자리에 우리 nginx.conf를 둔다.
#   - /etc/nginx/conf.d/*.conf 는 nginx가 자동으로 include하는 디렉터리.
# ─────────────────────────────────────────────────────────────
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ─────────────────────────────────────────────────────────────
# builder 스테이지에서 만들어진 정적 산출물(/app/dist)을
# nginx 웹 루트(/usr/share/nginx/html/)로 복사.
#   - nginx.conf의 `root /usr/share/nginx/html;` 와 짝을 이룸.
# ─────────────────────────────────────────────────────────────
COPY --from=builder /app/dist /usr/share/nginx/html/

# ─────────────────────────────────────────────────────────────
# 이 컨테이너가 listen 하는 포트를 "선언".
#   - 실제 포트 노출은 docker run -p 옵션이 함.
#   - EXPOSE는 문서화 + 메타데이터.
# ─────────────────────────────────────────────────────────────
EXPOSE 80

# ─────────────────────────────────────────────────────────────
# 컨테이너 런타임 헬스체크.
#   --interval=30s     : 30초마다 검사
#   --timeout=3s       : 한 번 검사가 3초 안에 끝나야 함
#   --start-period=5s  : 컨테이너 시작 후 5초 동안은 실패해도 unhealthy로 안 침
#   --retries=3        : 연속 3회 실패 시 unhealthy로 마크
#   /healthz           : nginx.conf에 만들어 둔 헬스 엔드포인트
# 결과는 `docker ps`의 STATUS 컬럼에 healthy/unhealthy로 표시.
# ─────────────────────────────────────────────────────────────
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1
