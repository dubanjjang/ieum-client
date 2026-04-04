import LoginDrawer from "@/features/login/ui/login-drawer";
import OnBoardingCarousel from "@/features/login/ui/on-boarding-carousel";
import Fade from "@/shared/animation/fade";

interface Props {
  onClickLogin: () => void;
}

export default function LoginOnBoardPage({ onClickLogin }: Props) {
  return (
    <div className="flex flex-1 flex-col px-5 py-8">
      <Fade className="flex flex-1 flex-col">
        <OnBoardingCarousel className="flex-1" />
      </Fade>

      <Fade delay={0.4} className="sticky bottom-0">
        <LoginDrawer onLogin={onClickLogin} />
      </Fade>
    </div>
  );
}
