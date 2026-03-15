import { type ChangeEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import useSignup, { SIGNUP_STEPS } from "@/features/signup/model/use-signup";
import SignupForm from "@/features/signup/ui/signup-form";
import Fade from "@/shared/animation/fade";
import useFunnel from "@/shared/model/useFunnel";
import PopUpLayout from "@/shared/ui/pop-up-layout";
import StepProgress from "@/shared/ui/step-progress";

export default function SignupPage() {
  const location = useLocation();
  const termsData = location.state?.termsData;

  const nav = useNavigate();

  const {
    signupData,
    setSignupData,
    errorMessage,
    validate,
    clearErrorMessage,
  } = useSignup(termsData);

  const { Funnel, FunnelStep, setStep, stepIndex } = useFunnel({
    steps: SIGNUP_STEPS.map((item) => item.step),
  });

  const progressValue = (stepIndex / (SIGNUP_STEPS.length - 1)) * 100;

  function handlePrevious() {
    if (stepIndex === 0) {
      nav("/terms");
    } else {
      clearErrorMessage();
      setStep(SIGNUP_STEPS[stepIndex - 1].step);
    }
  }

  function handleChangeForm(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // 회원가입 페이지에 URL을 치고 강제로 들어올 경우 terms로 리다이렉트
  useEffect(() => {
    if (!termsData) {
      nav("/terms", { replace: true });
    }
  }, [termsData, nav]);

  // 회원가입 폼이 렌더링 됐다가 리다이렉트 되지 않도록 null 반환
  if (!location.state?.termsData) {
    return null;
  }

  return (
    <PopUpLayout onPrev={handlePrevious} className="flex-1">
      <div className="flex flex-1 flex-col gap-y-12">
        <StepProgress
          stepCount={SIGNUP_STEPS.length}
          stepLabelList={SIGNUP_STEPS.map((item) => item.label)}
          value={progressValue}
          className="w-full"
          stepClassName="size-8"
        />

        <Funnel>
          <FunnelStep name="email-form">
            <Fade className="flex flex-1 flex-col">
              <SignupForm
                title="이메일을 입력해 주세요."
                signupData={signupData}
                inputProps={{
                  name: "email",
                  type: "email",
                  maxLength: 255,
                  placeholder: "이메일을 입력해 주세요...",
                  value: signupData.email,
                  autoComplete: "email",
                  inputMode: "email",
                  onChange: handleChangeForm,
                }}
                errorMessage={errorMessage}
                onSubmit={() => {
                  if (validate("email")) {
                    clearErrorMessage();
                    setStep("password-form");
                  }
                }}
              />
            </Fade>
          </FunnelStep>
          <FunnelStep name="password-form">
            <Fade className="flex flex-1 flex-col">
              <SignupForm
                title="비밀번호를 입력해 주세요."
                signupData={signupData}
                inputProps={{
                  name: "password",
                  type: "password",
                  maxLength: 29,
                  placeholder: "비밀번호를 입력해 주세요...",
                  value: signupData.password,
                  autoComplete: "new-password",
                  onChange: handleChangeForm,
                }}
                errorMessage={errorMessage}
                onSubmit={() => {
                  if (validate("password") && validate("passwordCheck")) {
                    clearErrorMessage();
                    setStep("nickname-form");
                  }
                }}
              />
            </Fade>
          </FunnelStep>
          <FunnelStep name="nickname-form">
            <Fade className="flex flex-1 flex-col">
              <SignupForm
                title="닉네임을 입력해 주세요."
                signupData={signupData}
                inputProps={{
                  name: "nickname",
                  maxLength: 10,
                  placeholder: "닉네임을 입력해 주세요...",
                  value: signupData.nickname,
                  onChange: handleChangeForm,
                }}
                buttonText="로그인"
                errorMessage={errorMessage}
                onSubmit={() => {
                  if (validate("nickname")) {
                    nav("/login");
                  }
                }}
              />
            </Fade>
          </FunnelStep>
        </Funnel>
      </div>
    </PopUpLayout>
  );
}
