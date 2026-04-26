import { useNavigate } from "react-router";

import Fade from "@/shared/animation/fade";
import PageLayout from "@/shared/ui/page-layout";
import Section from "@/shared/ui/section";
import WithdrawalContent from "@/pages/withdrawal/ui/withdrawal-content";
import { Button } from "@/shared/ui/button";

export default function WithdrawalPage() {
  const nav = useNavigate();

  return (
    <Fade delay={0.2} className="relative flex flex-1 flex-col overflow-hidden">
      <PageLayout>
        <Section
          title="종우님, 탈퇴가 진행 중이예요"
          description={
            "7일 뒤에 모든 정보가 사라져요\n마음이 바뀌셨다면 다시 돌아올 수 있어요."
          }
          className="mt-12 flex flex-1 flex-col"
        >
          <WithdrawalContent
            dayssince={127}
            messageCount={234}
            readerCount={1309}
            nickname="종우"
          />

          <Fade delay={2.8} className="flex flex-1 flex-col justify-end gap-3">
            <Button className="w-full" onClick={() => nav("/home")}>
              탈퇴를 취소할래요
            </Button>
            <Button
              variant="ghost"
              className="h-auto w-fit self-center p-0 text-xs font-normal text-neutral-400 underline underline-offset-4 hover:bg-transparent hover:text-neutral-400"
              onClick={() => nav("/login")}
            >
              로그아웃
            </Button>
          </Fade>
        </Section>
      </PageLayout>

      <img
        src="/ieum.svg"
        alt="IEUM symbol logo"
        className="pointer-events-none absolute top-1/2 left-1/2 w-64 -translate-x-1/4 -translate-y-1/4 opacity-10"
      />
    </Fade>
  );
}
