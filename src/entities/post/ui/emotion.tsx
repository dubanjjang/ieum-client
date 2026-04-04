import {
  type POST_EMOTION_TYPE,
  POST_EMOTIONS,
} from "@/entities/post/type/type";
import Grainient from "@/shared/animation/grainient";
import { cn } from "@/shared/lib/utils";

interface Props {
  type: POST_EMOTION_TYPE;
  grayScale?: boolean;
  hideLabel?: boolean;
  className?: string;
  labelClassName?: string;
}

export default function Emotion({
  type,
  grayScale = false,
  hideLabel = false,
  className,
  labelClassName,
}: Props) {
  return (
    <div className={cn("relative size-15", className)}>
      <Grainient
        className={cn(
          "size-full rounded-full blur-md transition-all duration-300 ease-in-out",
          grayScale && "grayscale",
        )}
        color1={POST_EMOTIONS[type].color[0]}
        color2={POST_EMOTIONS[type].color[1]}
        color3={POST_EMOTIONS[type].color[2]}
        timeSpeed={1.5}
        colorBalance={0}
        warpStrength={2.1}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={42}
        blendSoftness={0.05}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated
        contrast={1.5}
        gamma={2}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={1.35}
      />

      <img
        src={POST_EMOTIONS[type].imageUrl}
        alt={`${type} Emoticon Image`}
        className={cn(
          "absolute top-1/2 left-1/2 aspect-square w-[80%] -translate-1/2 object-cover transition-all duration-300 ease-in-out",
          grayScale && "grayscale",
        )}
      />

      {!hideLabel && (
        <p
          className={cn(
            "text-center text-xs font-medium",
            grayScale && "text-neutral-400",
            labelClassName,
          )}
        >
          {POST_EMOTIONS[type].label}
        </p>
      )}
    </div>
  );
}
