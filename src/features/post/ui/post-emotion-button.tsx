import { motion } from "framer-motion";

import AngryEmoticon from "@/features/post/assets/angry.svg";
import AngryAnimEmoticon from "@/features/post/assets/angry-anim.webp";
import HandsomeEmoticon from "@/features/post/assets/handsome.svg";
import HandsomeAnimEmoticon from "@/features/post/assets/handsome-anim.webp";
import HappyEmoticon from "@/features/post/assets/happy.svg";
import HappyAnimEmoticon from "@/features/post/assets/happy-anim.webp";
import SadEmoticon from "@/features/post/assets/sad.svg";
import SadAnimEmoticon from "@/features/post/assets/sad-anim.webp";
import SurpriseEmoticon from "@/features/post/assets/surprise.svg";
import SurpriseAnimEmoticon from "@/features/post/assets/surprise-anim.webp";
import { Button } from "@/shared/ui/button";

export const POST_EMOTICONS = {
  happy: {
    imageUrl: HappyEmoticon,
    animationUrl: HappyAnimEmoticon,
  },
  sad: {
    imageUrl: SadEmoticon,
    animationUrl: SadAnimEmoticon,
  },
  surprise: {
    imageUrl: SurpriseEmoticon,
    animationUrl: SurpriseAnimEmoticon,
  },
  angry: {
    imageUrl: AngryEmoticon,
    animationUrl: AngryAnimEmoticon,
  },
  handsome: {
    imageUrl: HandsomeEmoticon,
    animationUrl: HandsomeAnimEmoticon,
  },
} as const;

export type POST_EMOTICON_TYPE = keyof typeof POST_EMOTICONS;

interface Props {
  type: POST_EMOTICON_TYPE;
  isAnimated: boolean;
  count: number;
  onClick?: () => void;
  onAnimationComplete?: () => void;
}

export default function PostEmotionButton({
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
        aria-label="이모티콘 버튼"
        onClick={onClick}
      >
        <div className="relative size-5">
          {isAnimated ? (
            <motion.img
              src={POST_EMOTICONS[type].animationUrl}
              className="absolute inset-0"
              animate={{ scale: [1.0, 1.4, 1.0] }}
              transition={{ duration: 2.0, ease: "easeOut" }}
              onAnimationComplete={onAnimationComplete}
            />
          ) : (
            <img
              src={POST_EMOTICONS[type].imageUrl}
              alt="이모티콘 이미지"
              className="size-5"
            />
          )}
        </div>
      </Button>

      <p className="-mt-1.5 text-center text-xs">{count}</p>
    </div>
  );
}
