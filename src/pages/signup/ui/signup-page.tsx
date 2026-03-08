import { useNavigate } from "react-router";

import SignupForm from "@/features/signup/ui/signup-form";
import TermsForm from "@/features/signup/ui/terms-form";
import useFunnel from "@/shared/model/useFunnel";

export default function SignupPage() {
  const nav = useNavigate();

  const { Funnel, FunnelStep, setStep } = useFunnel({
    initStep: "terms",
  });

  return (
    <Funnel>
      <FunnelStep name="terms">
        <TermsForm onSubmit={() => setStep("email-form")} />
      </FunnelStep>
      <FunnelStep name="email-form">
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
      </FunnelStep>
      <FunnelStep name="password-form">
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
      </FunnelStep>
      <FunnelStep name="nickname-form">
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
      </FunnelStep>
    </Funnel>
  );
}
