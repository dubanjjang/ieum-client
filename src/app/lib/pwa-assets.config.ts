import {
  defineConfig,
  minimal2023Preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
  preset: minimal2023Preset,
  images: ["public/vite.svg"], // 원본 이미지 파일 경로, 이걸 기준으로 모든 파생 이미지 생성(1024x1024 권장),
});
