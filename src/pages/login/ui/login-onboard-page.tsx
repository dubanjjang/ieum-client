import LoginDrawer from "@/features/login/ui/login-drawer";
import OnBoardingCarousel from "@/features/login/ui/on-boarding-carousel";
import { Button } from "@/shared/ui/button";

interface Props {
  onClickLogin: () => void;
}

export default function LoginOnBoardPage({ onClickLogin }: Props) {
  return (
    <div className="flex flex-1 flex-col">
      <OnBoardingCarousel className="flex-1" />
      <div className="w-full space-y-1 px-4 pb-6">
        <LoginDrawer onClickEmailLogin={onClickLogin} />
        <div className="text-muted-foreground text-center text-sm">
          이음이 처음이신가요?{" "}
          <Button variant="link" className="p-0">
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}
