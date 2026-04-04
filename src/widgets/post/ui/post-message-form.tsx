import type { PostCreateFormData } from "@/entities/post/type/type";
import { Button } from "@/shared/ui/button";
import Section from "@/shared/ui/section";
import { Textarea } from "@/shared/ui/textarea";

interface Props {
  formData: PostCreateFormData;
  onChange: (formData: PostCreateFormData) => void;
  onSubmit?: () => void;
}

export default function PostMessageForm({
  formData,
  onChange,
  onSubmit,
}: Props) {
  return (
    <Section
      title="💌 이곳에 남길 메시지를 작성해 주세요"
      description="속마음을 글로 표현해 보세요."
      className="flex flex-1 flex-col"
    >
      <div className="flex flex-1 flex-col justify-between gap-y-4">
        <Textarea
          placeholder="메시지를 입력해 주세요..."
          value={formData.message}
          onChange={(e) =>
            onChange({
              ...formData,
              message: e.target.value,
            })
          }
        />
        <Button
          className="w-full"
          disabled={formData.message.trim().length === 0}
          onClick={onSubmit}
        >
          다음
        </Button>
      </div>
    </Section>
  );
}
