import LoginFormPage from "@/pages/login/ui/login-form-page";
import LoginOnBoardPage from "@/pages/login/ui/login-onboard-page";
import useFunnel from "@/shared/model/useFunnel";

export default function LoginPage() {
  const { Funnel, FunnelStep, setStep } = useFunnel({
    initStep: "onboard",
  });

  return (
    <Funnel>
      <FunnelStep name="onboard">
        <LoginOnBoardPage onClickLogin={() => setStep("form")} />
      </FunnelStep>
      <FunnelStep name="form">
        <LoginFormPage />
      </FunnelStep>
    </Funnel>
  );
}
