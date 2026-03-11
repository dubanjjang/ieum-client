import type { SubmitEvent } from "react";

import IeumText from "@/shared/assets/ieum-text.svg";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export default function LoginForm() {
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    console.log(`✅ 로그인 시도\n- email: ${email}\n- password: ${password}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-y-8">
      <div className="flex flex-col justify-end gap-y-2">
        <div className="flex items-center justify-center gap-x-2">
          <img
            src="/ieum.svg"
            className="size-7 object-cover"
            alt="IEUM symbol logo"
          />
          <img src={IeumText} className="w-18" alt="IEUM text logo" />
        </div>

        <p className="text-primary text-center text-xs font-medium">
          지금 여기, 감정의 순간을 기록하다.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <Label className="text-xs font-semibold" htmlFor="email">
            이메일
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력해 주세요..."
            className="mt-1"
            maxLength={255}
            required
            autoFocus
            autoComplete="email"
            inputMode="email"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold" htmlFor="password">
            비밀번호
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요..."
            className="mt-1"
            maxLength={72}
            required
            autoComplete="current-password"
            enterKeyHint="done" // 모바일 화면에서 자판에 '이동'이 아닌 '완료'로 표시 됨
          />
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <Button type="submit" className="w-full">
          로그인
        </Button>

        <div className="text-muted-foreground flex items-center text-center text-sm">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex-1 p-0 text-sm hover:bg-transparent"
          >
            회원가입
          </Button>
          <div className="h-4 w-px bg-neutral-200" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex-1 p-0 text-sm hover:bg-transparent"
          >
            이메일 찾기
          </Button>
          <div className="h-4 w-px bg-neutral-200" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex-1 p-0 text-sm hover:bg-transparent"
          >
            비밀번호 찾기
          </Button>
        </div>
      </div>
    </form>
  );
}
