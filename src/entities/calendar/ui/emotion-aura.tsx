import {
  type POST_EMOTION_TYPE,
  POST_EMOTIONS,
} from "@/entities/post/type/type";

interface Props {
  type: POST_EMOTION_TYPE;
}

export default function EmotionAura({ type }: Props) {
  return (
    <div className="relative aspect-square w-full max-w-7 blur-sm">
      <div
        className="animation-duration-[1.5s] absolute top-0 left-0 size-4 animate-pulse rounded-full opacity-50"
        style={{ backgroundColor: POST_EMOTIONS[type].color[0] }}
      />
      <div
        className="animation-delay-[0.6s] animation-duration-[3s] absolute right-0 bottom-0 size-5 animate-pulse rounded-full opacity-60"
        style={{ backgroundColor: POST_EMOTIONS[type].color[1] }}
      />
      <div
        className="animation-delay-[1.2s] animation-duration-[4s] absolute inset-0 m-auto size-3 animate-pulse rounded-full opacity-40"
        style={{ backgroundColor: POST_EMOTIONS[type].color[2] }}
      />
    </div>
  );
}
