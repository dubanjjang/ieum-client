import { useState } from "react";
import { BotMessageSquare } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  type POST_EMOTION_TYPE,
  POST_EMOTIONS,
} from "@/entities/post/type/type";
import Emotion from "@/entities/post/ui/emotion";
import DateChanger from "@/features/report/ui/date-changer";
import CountUp from "@/shared/animation/count-up";
import Fade from "@/shared/animation/fade";
import { Card } from "@/shared/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";
import PageLayout from "@/shared/ui/page-layout";
import Section from "@/shared/ui/section";

export const description = "A radar chart with dots";

const emotionKeys = Object.keys(
  POST_EMOTIONS,
) as (keyof typeof POST_EMOTIONS)[];

const chartData = emotionKeys.map((key) => ({
  type: POST_EMOTIONS[key].label,
  count: { smile: 17, astonish: 8, cry: 16, anxious: 27, rage: 6, calm: 10 }[
    key
  ],
}));
const chartConfig = {
  count: {
    label: "작성 수",
    color: "var(--chart-1)",
  },
};

export default function ReportPage() {
  const [date, setDate] = useState(new Date());

  const [doneCount, setDoneCount] = useState(0);
  const allDone = doneCount >= emotionKeys.length;

  function handleChangeDate(date: Date) {
    setDate(date);
    setDoneCount(0);
  }

  return (
    <PageLayout>
      <Section
        title="📋 감정 리포트"
        description="월별로 어떤 감정의 메시지를 작성했는지 확인해 보세요."
        className="flex flex-1 flex-col"
      >
        <div className="space-y-10">
          <div className="flex flex-col gap-4">
            <DateChanger date={date} setDate={handleChangeDate} />
            <div
              key={date.getTime()}
              className="grid grid-cols-3 place-items-center gap-y-8"
            >
              {["smile", "astonish", "cry", "anxious", "rage", "calm"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="flex flex-col items-center gap-y-5"
                  >
                    <Emotion type={item as POST_EMOTION_TYPE} />
                    <div className="flex items-center text-sm">
                      <CountUp
                        from={0}
                        to={chartData[index].count}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                        onEnd={() => setDoneCount((c) => c + 1)}
                      />
                      <span>건</span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {allDone && (
            <Fade className="space-y-5">
              <Card className="flex flex-row items-center justify-between gap-2 p-4 text-sm text-gray-500">
                <BotMessageSquare className="size-6" />
                <p className="flex-1 truncate text-center">
                  이달은{" "}
                  <span
                    className="font-medium"
                    style={{ color: POST_EMOTIONS["rage"].color[0] }}
                  >
                    분노
                  </span>
                  가 가장 많이 느껴져요!
                </p>
                <div className="size-6" />
              </Card>

              <ChartContainer
                config={chartConfig}
                className="aspect-square max-h-72 w-full"
              >
                <RadarChart data={chartData}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <PolarAngleAxis dataKey="type" />
                  <PolarGrid />
                  <Radar
                    dataKey="count"
                    fill={POST_EMOTIONS["rage"].color[0]}
                    fillOpacity={0.4}
                    dot={{
                      r: 3,
                      fillOpacity: 1,
                    }}
                  />
                </RadarChart>
              </ChartContainer>
            </Fade>
          )}
        </div>
      </Section>
    </PageLayout>
  );
}
