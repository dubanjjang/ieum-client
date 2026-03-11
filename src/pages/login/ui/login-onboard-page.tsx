import { Link } from "react-router";

import LoginDrawer from "@/features/login/ui/login-drawer";
import OnBoardingCarousel from "@/features/login/ui/on-boarding-carousel";
import Fade from "@/shared/animation/fade";
import { Button } from "@/shared/ui/button";

interface Props {
  onClickLogin: () => void;
}

export default function LoginOnBoardPage({ onClickLogin }: Props) {
  return (
    <div className="flex flex-1 flex-col px-5 py-8">
      <Fade className="flex flex-1 flex-col">
        <OnBoardingCarousel className="flex-1" />
      </Fade>

      <Fade delay={0.5}>
        <div className="w-full space-y-1">
          <LoginDrawer onClickEmailLogin={onClickLogin} />
          <div className="text-muted-foreground text-center text-sm">
            이음이 처음이신가요?{" "}
            <Button variant="link" className="p-0" asChild>
              <Link to="/terms">회원가입</Link>
            </Button>
          </div>
        </div>
      </Fade>
    </div>
  );
}
