import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

import useTerms from "@/features/terms/model/use-terms";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";

export default function TermsForm() {
  const nav = useNavigate();
  const { termsData, setTermsData } = useTerms();

  const allChecked = Object.values(termsData).every(Boolean);

  function handleToggle(field: keyof typeof termsData) {
    setTermsData((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  function handleToggleAll() {
    const next = !allChecked;
    setTermsData({
      personalInformation: next,
      locationService: next,
      pushAlarm: next,
    });
  }

  function handleNext() {
    if (termsData.personalInformation && termsData.locationService) {
      nav("/signup", { state: { termsData } });
    }
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div className="z-10 flex flex-1 flex-col gap-y-10">
        <h1 className="truncate text-xl font-bold">
          서비스 이용 약관에 동의해 주세요.
        </h1>

        <div className="space-y-4">
          <div className="flex items-center gap-x-3">
            <Checkbox
              id="all"
              checked={allChecked}
              onCheckedChange={handleToggleAll}
            />
            <Label htmlFor="all" className="text-base">
              네, 모두 동의합니다.
            </Label>
          </div>

          <div className="h-px w-full bg-neutral-200" />

          <div className="flex items-center gap-x-2">
            <div className="flex flex-1 items-center gap-x-3">
              <Checkbox
                id="personal-infomation"
                checked={termsData.personalInformation}
                onCheckedChange={() => handleToggle("personalInformation")}
              />
              <Label htmlFor="personal-infomation" className="font-normal">
                (필수) 개인정보 처리 방침
              </Label>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-300"
              aria-label="약관 상세보기"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="flex flex-1 items-center gap-x-3">
              <Checkbox
                id="location-service"
                checked={termsData.locationService}
                onCheckedChange={() => handleToggle("locationService")}
              />
              <Label htmlFor="location-service" className="font-normal">
                (필수) 위치기반 서비스 이용약관
              </Label>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-300"
              aria-label="약관 상세보기"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="flex flex-1 items-center gap-x-3">
              <Checkbox
                id="push-alarm"
                checked={termsData.pushAlarm}
                onCheckedChange={() => handleToggle("pushAlarm")}
              />
              <Label htmlFor="push-alarm" className="font-normal">
                (선택) 푸쉬 알림 수신 동의
              </Label>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-300"
              aria-label="약관 상세보기"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>

          <p className="text-xs leading-5 text-neutral-400">
            필수 약관에 동의하지 않으면 서비스 이용이 제한되며 선택 약관의
            경우에는 동의하지 않아도 서비스 이용이 가능합니다.
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-end">
          <Button
            className="w-full"
            onClick={handleNext}
            disabled={
              !termsData.personalInformation || !termsData.locationService
            }
          >
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
