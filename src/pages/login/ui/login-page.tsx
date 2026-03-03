import OnBoardingCarousel from "@/entities/login/ui/on-boarding-carousel";
import { Button } from "@/shared/ui/button";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col">
      <OnBoardingCarousel className="flex-1" />
      <div className="w-full space-y-1 px-4 pb-6">
        <Button className="w-full">로그인</Button>
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
