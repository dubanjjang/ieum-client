import { useNavigate } from "react-router";

import SignupForm from "@/features/signup/ui/signup-form";
import Fade from "@/shared/animation/fade";
import useFunnel from "@/shared/model/useFunnel";
import PopUpLayout from "@/shared/ui/pop-up-layout";
import StepProgress from "@/shared/ui/step-progress";

const STEPS = ["email-form", "password-form", "nickname-form"] as const;

export default function SignupPage() {
  const nav = useNavigate();

  const { Funnel, FunnelStep, setStep, stepIndex } = useFunnel({
    steps: [...STEPS],
  });

  const progressValue = (stepIndex / (STEPS.length - 1)) * 100;

  function handlePrevious() {
    if (stepIndex === 0) {
      nav("/login");
    } else {
      setStep(STEPS[stepIndex - 1]);
    }
  }

  return (
    <PopUpLayout onPrev={handlePrevious} className="flex-1">
      <div className="flex flex-1 flex-col gap-y-12">
        <StepProgress
          stepCount={STEPS.length}
          stepLabelList={["이메일", "비밀번호", "닉네임"]}
          value={progressValue}
          className="w-full"
          stepClassName="size-8"
        />

        <Funnel>
          <FunnelStep name="email-form">
            <Fade className="flex flex-1 flex-col">
              <SignupForm
                title="이메일을 입력해 주세요."
                field="이메일"
                inputProps={{
                  type: "email",
                  maxLength: 255,
                  placeholder: "이메일을 입력해 주세요...",
                  autoComplete: "email",
                  inputMode: "email",
                }}
                onSubmit={() => setStep("password-form")}
              />
            </Fade>
          </FunnelStep>
          <FunnelStep name="password-form">
            <Fade className="flex flex-1 flex-col">
              <SignupForm
                title="비밀번호를 입력해 주세요."
                field="비밀번호"
                inputProps={{
                  type: "password",
                  maxLength: 72,
                  placeholder: "비밀번호를 입력해 주세요...",
                  autoComplete: "current-password",
                }}
                onSubmit={() => setStep("nickname-form")}
              />
            </Fade>
          </FunnelStep>
          <FunnelStep name="nickname-form">
            <Fade className="flex flex-1 flex-col">
              <SignupForm
                title="닉네임을 입력해 주세요."
                field="닉네임"
                inputProps={{
                  maxLength: 255,
                  placeholder: "닉네임을 입력해 주세요...",
                }}
                buttonText="로그인"
                onSubmit={() => nav("/login")}
              />
            </Fade>
          </FunnelStep>
        </Funnel>
      </div>
    </PopUpLayout>
  );
}
