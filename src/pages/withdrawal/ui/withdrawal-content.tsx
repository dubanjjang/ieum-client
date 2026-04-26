import type { ReactNode } from "react";

import CalendarIcon from "@/pages/withdrawal/assets/3dicons-calender-dynamic-gradient.svg";
import MailIcon from "@/pages/withdrawal/assets/3dicons-mail-dynamic-gradient.svg";
import BoyIcon from "@/pages/withdrawal/assets/3dicons-boy-dynamic-gradient.svg";
import CountUp from "@/shared/animation/count-up";
import Fade from "@/shared/animation/fade";

function TimelineItem({
  icon,
  label,
  value,
  unit,
}: {
  icon: string;
  label: string;
  value: ReactNode;
  unit: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <img src={icon} alt="" className="size-12 shrink-0" />
      <div className="text-primary">
        <span className="text-sm">{label}</span>
        <p className="text-3xl font-bold">
          {value}
          <span className="ml-0.5">{unit}</span>
        </p>
      </div>
    </div>
  );
}

interface Props {
  dayssince: number;
  messageCount: number;
  readerCount: number;
  nickname: string;
}

export default function WithdrawalContent({
  dayssince,
  messageCount,
  readerCount,
  nickname,
}: Props) {
  return (
    <div className="flex flex-1 flex-col justify-around gap-8 py-4">
      <div className="space-y-10">
        <Fade delay={0.5}>
          <TimelineItem
            icon={CalendarIcon}
            label={`${nickname}님과 처음 만난 날로부터`}
            value={<CountUp to={dayssince} separator="," />}
            unit="일"
          />
        </Fade>

        <Fade delay={1.0}>
          <TimelineItem
            icon={MailIcon}
            label={`${nickname}님이 남겨주신 메시지`}
            value={<CountUp to={messageCount} separator="," />}
            unit="건"
          />
        </Fade>

        <Fade delay={1.5}>
          <TimelineItem
            icon={BoyIcon}
            label={`${nickname}님의 메시지를 읽은 유저`}
            value={<CountUp to={readerCount} separator="," />}
            unit="명"
          />
        </Fade>
      </div>

      <Fade delay={2.0} className="space-y-2">
        <p className="text-lg font-semibold">{`${nickname}님!`}</p>
        <p className="text-muted-foreground whitespace-pre-line">
          {
            "우리들의 추억이 가득한 이음을\n조금 더 이용해 보시는 건 어떠신가요?"
          }
        </p>
      </Fade>
    </div>
  );
}
