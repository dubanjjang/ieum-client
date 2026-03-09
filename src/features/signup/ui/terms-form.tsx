import { ChevronRight } from "lucide-react";

import { Button } from "@/shared/ui/button";

interface Props {
  onSubmit?: () => void;
}

export default function TermsForm({ onSubmit }: Props) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden px-6 py-8">
      <div className="z-10 flex flex-1 flex-col gap-y-10">
        <h1 className="truncate text-xl font-bold">
          서비스 이용 약관에 동의해 주세요.
        </h1>

        <div className="space-y-4">
          <div className="flex items-center gap-x-3">
            <input id="all" type="checkbox" />
            <label htmlFor="all" className="text-lg font-medium">
              네, 모두 동의합니다.
            </label>
          </div>

          <div className="h-px w-full bg-neutral-200"></div>

          <div className="flex items-center gap-x-2">
            <div className="flex flex-1 items-center gap-x-3">
              <input id="personal-infomation" type="checkbox" />
              <label htmlFor="personal-infomation">
                (필수) 개인정보 처리 방침
              </label>
            </div>

            <Button variant="ghost" size="sm" className="text-neutral-300">
              <ChevronRight className="size-5" />
            </Button>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="flex flex-1 items-center gap-x-3">
              <input id="location-service" type="checkbox" />
              <label htmlFor="location-service">
                (필수) 위치기반 서비스 이용약관
              </label>
            </div>

            <Button variant="ghost" size="sm" className="text-neutral-300">
              <ChevronRight className="size-5" />
            </Button>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="flex flex-1 items-center gap-x-3">
              <input id="push-alarm" type="checkbox" />
              <label htmlFor="push-alarm">(선택) 푸쉬 알림 수신 동의</label>
            </div>

            <Button variant="ghost" size="sm" className="text-neutral-300">
              <ChevronRight className="size-5" />
            </Button>
          </div>

          <p className="text-xs leading-5 text-neutral-400">
            필수 약관에 동의하지 않으면 서비스 이용이 제한되며 선택 약관의
            경우에는 동의하지 않아도 서비스 이용이 가능합니다.
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-end">
          <Button onClick={onSubmit} className="w-full">
            다음
          </Button>
        </div>
      </div>

      <img
        src="/ieum.svg"
        alt="IEUM symbol logo"
        className="absolute top-1/2 left-1/2 w-64 -translate-x-1/4 -translate-y-1/4 opacity-10"
      />
    </div>
  );
}
