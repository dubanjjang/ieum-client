import LoginForm from "@/features/login/ui/login-form";
import LoginOnBoardPage from "@/pages/login/ui/login-onboard-page";
import Fade from "@/shared/animation/fade";
import useFunnel from "@/shared/model/useFunnel";
import PopUpLayout from "@/shared/ui/pop-up-layout";

export default function LoginPage() {
  const { Funnel, FunnelStep, setStep } = useFunnel({
    steps: ["onboard", "form"],
  });

  return (
    <Funnel>
      <FunnelStep name="onboard">
        <LoginOnBoardPage onClickLogin={() => setStep("form")} />
      </FunnelStep>
      <FunnelStep name="form">
        <Fade delay={0.2} className="flex flex-1 flex-col">
          <PopUpLayout
            className="flex flex-1 flex-col"
            onPrev={() => setStep("onboard")}
          >
            <LoginForm />
          </PopUpLayout>
        </Fade>
      </FunnelStep>
    </Funnel>
  );
}
