import { cx } from "class-variance-authority";

import {
  type POST_EMOTION_TYPE,
  POST_EMOTIONS,
} from "@/features/post/type/type";
import { Button } from "@/shared/ui/button";

interface Props {
  type: POST_EMOTION_TYPE;
  selected?: boolean;
  onClick?: () => void;
}

export default function PostEmotionButton({
  type,
  selected = false,
  onClick,
}: Props) {
  return (
    <div className="relative size-fit">
      <div
        className={cx(
          "absolute inset-0 transition-all duration-800",
          !selected && "grayscale",
        )}
      >
        <div
          className={cx(
            "size-8 rounded-full opacity-20 blur-sm",
            selected && "animate-pulse",
            POST_EMOTIONS[type].color,
          )}
          style={{ animationDuration: "3s" }}
        />
        <div className="flex justify-end">
          <div
            className={cx(
              "size-12 rounded-full opacity-40 blur-md",
              selected && "animate-pulse",
              POST_EMOTIONS[type].color,
            )}
            style={{ animationDuration: "3.5s", animationDelay: "1s" }}
          />
        </div>
      </div>

      <Button
        variant="ghost"
        className="size-24 flex-col p-3 hover:bg-transparent"
        aria-label={`${type} emotion button`}
        onClick={onClick}
      >
        <img
          src={POST_EMOTIONS[type].imageUrl}
          alt={`${type} emotion image`}
          className={cx(
            "size-12 object-cover transition-all",
            !selected && "grayscale",
          )}
        />
        <p
          className={cx(
            "text-xs",
            selected ? "text-primary" : "text-neutral-500",
          )}
        >
          {POST_EMOTIONS[type].label}
        </p>
      </Button>
    </div>
  );
}
