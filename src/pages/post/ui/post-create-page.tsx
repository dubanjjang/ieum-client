import { useState } from "react";
import { useNavigate } from "react-router";

import type { PostCreateFormData } from "@/entities/post/type/type";
import Fade from "@/shared/animation/fade";
import useFunnel from "@/shared/model/useFunnel";
import PopUpLayout from "@/shared/ui/pop-up-layout";
import StepProgress from "@/shared/ui/step-progress";
import PostEmotionForm from "@/widgets/post/ui/post-emotion-form";
import PostLocationForm from "@/widgets/post/ui/post-location-form";
import PostMessageForm from "@/widgets/post/ui/post-message-form";
import PostSummaryForm from "@/widgets/post/ui/post-summary-form";

const POST_CREATE_STEP = [
  {
    step: "location",
    label: "위치 선택",
  },
  {
    step: "emotion",
    label: "감정 선택",
  },
  {
    step: "message",
    label: "메시지 작성",
  },
  {
    step: "summary",
    label: "요약",
  },
] as const;

export default function PostCreatePage() {
  const nav = useNavigate();

  const { Funnel, FunnelStep, prevStep, nextStep, stepIndex } = useFunnel({
    steps: POST_CREATE_STEP.map((item) => item.step),
    onFirst: () => nav("/"),
    onLast: () => nav("/"),
  });

  const [createFormData, setCreateFormData] = useState<PostCreateFormData>({
    location: null,
    emotion: null,
    message: "",
  });

  return (
    <Fade className="flex flex-1 flex-col">
      <PopUpLayout
        title="이음글 작성"
        className="flex flex-1 flex-col"
        onPrev={prevStep}
      >
        <div className="flex flex-1 flex-col gap-y-10">
          <StepProgress
            stepCount={4}
            stepLabelList={POST_CREATE_STEP.map((item) => item.label)}
            value={25 * stepIndex}
          />

          <Funnel>
            <FunnelStep name="location">
              <PostLocationForm
                formData={createFormData}
                onChange={setCreateFormData}
                onSubmit={nextStep}
              />
            </FunnelStep>
            <FunnelStep name="emotion">
              <Fade className="flex flex-1 flex-col">
                <PostEmotionForm
                  formData={createFormData}
                  onChange={setCreateFormData}
                  onSubmit={nextStep}
                />
              </Fade>
            </FunnelStep>
            <FunnelStep name="message">
              <Fade className="flex flex-1 flex-col">
                <PostMessageForm
                  formData={createFormData}
                  onChange={setCreateFormData}
                  onSubmit={nextStep}
                />
              </Fade>
            </FunnelStep>
            <FunnelStep name="summary">
              <Fade className="flex flex-1 flex-col">
                <PostSummaryForm
                  formData={createFormData}
                  onSubmit={nextStep}
                />
              </Fade>
            </FunnelStep>
          </Funnel>
        </div>
      </PopUpLayout>
    </Fade>
  );
}
