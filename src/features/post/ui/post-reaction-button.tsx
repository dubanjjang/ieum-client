import { motion } from "framer-motion";

import {
  type POST_REACTION_TYPE,
  POST_REACTIONS,
} from "@/entities/post/type/type";
import { Button } from "@/shared/ui/button";

interface Props {
  type: POST_REACTION_TYPE;
  isAnimated: boolean;
  count: number;
  onClick?: () => void;
  onAnimationComplete?: () => void;
}

export default function PostReactionButton({
  type,
  isAnimated,
  count,
  onClick,
  onAnimationComplete,
}: Props) {
  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="p-0"
        aria-label="reaction button"
        onClick={onClick}
      >
        <div className="relative size-5">
          {isAnimated ? (
            <motion.img
              src={POST_REACTIONS[type].animationUrl}
              className="absolute inset-0"
              animate={{ scale: [1.0, 1.4, 1.0] }}
              transition={{ duration: 2.0, ease: "easeOut" }}
              onAnimationComplete={onAnimationComplete}
            />
          ) : (
            <img
              src={POST_REACTIONS[type].imageUrl}
              alt="reaction image"
              className="size-5"
            />
          )}
        </div>
      </Button>

      <p className="-mt-1.5 text-center text-xs">{count}</p>
    </div>
  );
}
