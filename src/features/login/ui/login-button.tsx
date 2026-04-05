import GoogleLogo from "@/shared/assets/google-logo.svg";
import KakaoLogo from "@/shared/assets/kakao-logo.svg";
import NaverLogo from "@/shared/assets/naver-logo.svg";
import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";

interface Props {
  onLogin?: () => void;
}

export default function LoginButton({ onLogin }: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full">로그인</Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-full max-w-105">
        <div>
          <DrawerHeader className="space-y-1">
            <DrawerTitle className="text-lg">로그인 방법 선택</DrawerTitle>
            <DrawerDescription>
              간편 로그인으로 빠르게 시작해 보세요.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex items-center justify-center gap-x-8 pt-4 pb-8">
            <Button
              variant="ghost"
              className="bg-naver hover:bg-naver size-12 overflow-hidden rounded-full p-2 transition duration-200 hover:brightness-90"
              aria-label="네이버 로그인 버튼"
              onClick={onLogin}
            >
              <img src={NaverLogo} className="size-10 object-cover" />
            </Button>
            <Button
              variant="ghost"
              className="bg-kakao hover:bg-kakao size-12 overflow-hidden rounded-full p-2 transition duration-200 hover:brightness-90"
              aria-label="카카오 로그인 버튼"
              onClick={onLogin}
            >
              <img src={KakaoLogo} className="size-10 object-cover" />
            </Button>
            <Button
              variant="ghost"
              className="size-12 overflow-hidden rounded-full bg-neutral-100 p-2 transition duration-200 hover:brightness-90"
              aria-label="구글 로그인 버튼"
              onClick={onLogin}
            >
              <img src={GoogleLogo} className="size-6 object-cover" />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
