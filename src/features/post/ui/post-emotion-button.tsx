import { type POST_EMOTION_TYPE } from "@/entities/post/type/type";
import Emotion from "@/entities/post/ui/emotion";
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
    <Button
      variant="ghost"
      className="size-auto p-3 hover:bg-transparent"
      aria-label={`${type} Emotion Button`}
      onClick={onClick}
    >
      <Emotion type={type} grayScale={!selected} />
    </Button>
  );
}
