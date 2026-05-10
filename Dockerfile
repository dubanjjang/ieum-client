# ─────────────────────────────────────────────────────────────
# 베이스 이미지: nginx 1.27 (alpine 기반).
#   - alpine = 매우 가벼운 리눅스 배포판. 이미지 크기를 작게 해줌.
#   - 1.27 = nginx 메이저.마이너 버전을 고정. "latest" 같은 떠다니는 태그를
#     쓰지 않는 이유는, 어느 날 베이스가 바뀌어 빌드 결과가 달라지는 걸 막기 위함(재현성).
# ─────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine

# ─────────────────────────────────────────────────────────────
# OCI 표준 라벨(metadata).
#   - 이미지 안에 "이게 어디서 온 무엇인지"를 박아 둔다.
#   - docker inspect 시 보이고, GitHub Container Registry나 일부 도구는
#     image.source 라벨을 보고 리포 링크를 자동으로 보여준다.
# ─────────────────────────────────────────────────────────────
LABEL org.opencontainers.image.source="https://github.com/dubanjjang/ieum-client"
LABEL org.opencontainers.image.description="IEUM client (static, served by nginx)"

# ─────────────────────────────────────────────────────────────
# nginx:alpine 베이스에는 기본 데모용 default.conf가 들어 있다.
# 우리 설정으로 깔끔히 갈아끼우려고 먼저 지우고, 그 자리에 우리 nginx.conf를 둔다.
#   - /etc/nginx/conf.d/*.conf 는 nginx가 자동으로 include하는 디렉터리.
#   - 그래서 이 경로에 default.conf 라는 이름으로 두면 자동 적용됨.
# ─────────────────────────────────────────────────────────────
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ─────────────────────────────────────────────────────────────
# 호스트(또는 CI 러너)에서 미리 빌드해 둔 정적 산출물 dist/ 를
# nginx의 기본 웹 루트(/usr/share/nginx/html/)로 복사.
#   - nginx.conf의 `root /usr/share/nginx/html;` 와 짝을 이룸.
#   - 이 한 줄 덕분에 "이미지 = nginx + 우리 빌드 결과물 + 설정"이 됨.
# ─────────────────────────────────────────────────────────────
COPY dist/ /usr/share/nginx/html/

# ─────────────────────────────────────────────────────────────
# 이 컨테이너가 listen 하는 포트를 "선언".
#   - 실제로 포트를 여는 건 docker run -p 옵션이 함.
#   - EXPOSE는 문서화 + docker가 네트워킹 메타데이터로 사용하는 정도지만, 컨벤션상 명시해 두는 게 좋다.
# ─────────────────────────────────────────────────────────────
EXPOSE 80

# ─────────────────────────────────────────────────────────────
# 컨테이너 런타임 헬스체크.
#   --interval=30s     : 30초마다 검사
#   --timeout=3s       : 한 번 검사가 3초 안에 끝나야 함
#   --start-period=5s  : 컨테이너 시작 후 5초 동안은 실패해도 unhealthy로 안 침
#                        (nginx가 뜨기 전 잠깐의 grace 구간)
#   --retries=3        : 연속 3회 실패하면 unhealthy로 마크
#   CMD ...            : 실제로 돌릴 검사 명령
#     wget -qO-        : nginx 컨테이너에 기본 포함된 wget으로 GET 요청
#     /healthz         : nginx.conf에 만들어 둔 헬스 엔드포인트
#     || exit 1        : 실패 시 비정상 종료 코드(=헬스 실패) 반환
# 의미: 컨테이너 안에서 nginx가 정상 응답하는지 도커가 주기적으로 자가 점검.
# 결과는 `docker ps`의 STATUS 컬럼에 healthy/unhealthy로 표시.
# ─────────────────────────────────────────────────────────────
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1
