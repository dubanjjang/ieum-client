import LoginButton from "@/features/login/ui/login-button";
import OnBoardingCarousel from "@/features/login/ui/on-boarding-carousel";
import Fade from "@/shared/animation/fade";

export default function LoginPage() {
  // TODO: vender별 로그인 API 추가
  function handleLogin() {}

  return (
    <div className="flex flex-1 flex-col px-5 py-8">
      <Fade className="flex flex-1 flex-col">
        <OnBoardingCarousel className="flex-1" />
      </Fade>

      <Fade delay={0.4} className="sticky bottom-0">
        <LoginButton onLogin={handleLogin} />
      </Fade>
    </div>
  );
}
