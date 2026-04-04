import {
  type POST_EMOTION_TYPE,
  POST_EMOTIONS,
  type PostCreateFormData,
} from "@/entities/post/type/type";
import PostEmotionButton from "@/features/post/ui/post-emotion-button";
import { Button } from "@/shared/ui/button";
import Section from "@/shared/ui/section";

interface Props {
  formData: PostCreateFormData;
  onChange: (formData: PostCreateFormData) => void;
  onSubmit?: () => void;
}

export default function PostEmotionForm({
  formData,
  onChange,
  onSubmit,
}: Props) {
  return (
    <Section
      title="🤔 지금 어떤 감정이 드시나요?"
      description="현재 감정이 어떤지 알려주세요."
      className="flex flex-1 flex-col"
    >
      <div className="flex flex-1 flex-col justify-between gap-y-4">
        <div className="grid grid-cols-3 place-items-center gap-y-6">
          {Object.keys(POST_EMOTIONS).map((item) => {
            const emotion = item as POST_EMOTION_TYPE;
            return (
              <PostEmotionButton
                key={item}
                type={emotion}
                selected={formData.emotion === emotion}
                onClick={() => onChange({ ...formData, emotion })}
              />
            );
          })}
        </div>
        <Button
          className="w-full"
          disabled={!formData.emotion}
          onClick={onSubmit}
        >
          다음
        </Button>
      </div>
    </Section>
  );
}
