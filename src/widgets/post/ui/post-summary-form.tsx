import type { PostCreateFormData } from "@/entities/post/type/type";
import Emotion from "@/entities/post/ui/emotion";
import Fade from "@/shared/animation/fade";
import { Button } from "@/shared/ui/button";
import Section from "@/shared/ui/section";
import { Textarea } from "@/shared/ui/textarea";
import MapFixer from "@/widgets/map/ui/map-fixer";

interface Props {
  formData: PostCreateFormData;
  onSubmit?: () => void;
}

export default function PostSummaryForm({ formData, onSubmit }: Props) {
  return (
    <Section
      title="📮 메시지를 작성할게요"
      description="작성하신 내용이 맞는지 확인해 주세요."
      className="flex flex-1 flex-col"
    >
      <div className="flex flex-1 flex-col justify-between gap-y-4">
        <div className="space-y-10">
          <Fade duration={1} delay={0.5} className="space-y-3">
            <h1 className="font-medium">이 장소에서</h1>
            <MapFixer
              initLocation={formData.location!}
              className="h-48"
              readOnly
            />
          </Fade>

          <Fade duration={1} delay={1.2} className="space-y-3">
            <h1 className="self-start font-medium">이 감정을 느끼며</h1>
            <Emotion type={formData.emotion!} className="ml-3" />
          </Fade>

          <Fade duration={1} delay={1.9} className="space-y-3">
            <h1 className="font-medium">이 메시지를 작성했어요.</h1>
            <Textarea
              value={formData.message}
              readOnly
              className="pointer-events-none"
            />
          </Fade>
        </div>

        <Button className="w-full" onClick={onSubmit}>
          완료
        </Button>
      </div>
    </Section>
  );
}
