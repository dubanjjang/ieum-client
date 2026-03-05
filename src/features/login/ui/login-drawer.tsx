import GoogleLogo from "@/shared/assets/google-logo.svg";
import KakaoLogo from "@/shared/assets/kakao-logo.svg";
import NaverLogo from "@/shared/assets/naver-logo.svg";
import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";

interface Props {
  onClickEmailLogin?: () => void;
}

export default function LoginDrawer({ onClickEmailLogin }: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full">로그인</Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-full max-w-105">
        <div className="space-y-4 pb-4">
          <DrawerHeader>
            <DrawerTitle>로그인 방법 선택</DrawerTitle>
            <DrawerDescription>
              간편 로그인으로 빠르게 시작할 수 있어요.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex items-center justify-center gap-6">
            <Button
              variant="ghost"
              className="bg-naver hover:bg-naver size-10 rounded-full p-2 transition duration-200 hover:brightness-90"
            >
              <img src={NaverLogo} className="size-8 object-cover" />
            </Button>
            <Button
              variant="ghost"
              className="bg-kakao hover:bg-kakao size-10 rounded-full p-2 transition duration-200 hover:brightness-90"
            >
              <img src={KakaoLogo} className="size-8 object-cover" />
            </Button>
            <Button
              variant="ghost"
              className="size-10 rounded-full bg-neutral-100 p-2 transition duration-200 hover:brightness-90"
            >
              <img src={GoogleLogo} className="size-5 object-cover" />
            </Button>
          </div>

          <DrawerFooter>
            <Button className="w-full" onClick={onClickEmailLogin}>
              이메일로 로그인
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
