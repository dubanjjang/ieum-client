import { UserRound } from "lucide-react";

import KakaoLogo from "@/shared/assets/kakao-logo.svg";

export default function UserProfile() {
  return (
    <div className="flex min-w-0 items-center justify-between">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-neutral-200">
          <UserRound className="size-3/4 text-neutral-400" />
        </div>

        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-lg font-medium">전종우</p>
            <img
              src={KakaoLogo}
              alt="Kakao Logo Image"
              className="aspect-square size-4 rounded-full object-cover select-none"
            />
          </div>

          <p className="truncate text-xs text-rose-500">
            이음과 함께한지 13일 째
          </p>
        </div>
      </div>

      <p className="cursor-pointer truncate text-xs text-neutral-200">
        로그아웃
      </p>
    </div>
  );
}
