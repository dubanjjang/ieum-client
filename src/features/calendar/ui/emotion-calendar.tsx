import { ko } from "date-fns/locale";

import {
  type POST_EMOTION_TYPE,
  POST_EMOTIONS,
} from "@/features/post/type/type";
import { cn } from "@/shared/lib/utils";
import { Calendar, CalendarDayButton } from "@/shared/ui/calendar";

interface Props {
  onClickDay?: () => void;
}

export default function EmotionCalendar({ onClickDay }: Props) {
  return (
    <Calendar
      locale={ko}
      mode="single"
      showOutsideDays={false}
      className="w-full border-b p-0 pb-2"
      classNames={{
        month_caption: "justify-start",
        nav: "justify-end h-11 items-end",
        caption_label: "font-medium text-base",
        weekday: "first:text-red-500 last:text-blue-500",
      }}
      components={{
        MonthCaption: ({ calendarMonth }) => {
          const { date } = calendarMonth;
          return (
            <div>
              <p className="text-xs text-neutral-500">{date.getFullYear()}</p>
              <p className="text-lg">{date.getMonth() + 1}월의 감정</p>
            </div>
          );
        },
        DayButton: ({ className, day, modifiers, ...props }) => {
          const emotionKeys = Object.keys(POST_EMOTIONS) as POST_EMOTION_TYPE[];
          const type = emotionKeys[
            day.date.getDate() % (emotionKeys.length + 1)
          ] as POST_EMOTION_TYPE | undefined;

          return (
            <CalendarDayButton
              {...props}
              className={cn("p-1", className)}
              day={day}
              modifiers={modifiers}
              onClick={onClickDay}
            >
              <div
                className={cn(
                  "flex size-5 items-center justify-center rounded-full text-xs",
                  modifiers.today && "bg-primary text-primary-foreground",
                )}
              >
                {day.date.getDate()}
              </div>

              {type ? (
                <div
                  className={cn(
                    "aspect-square w-full max-w-7 transition-all duration-800",
                  )}
                >
                  <div
                    className={cn(
                      "size-2 rounded-full opacity-50 blur-sm",
                      POST_EMOTIONS[type].color,
                    )}
                    style={{ animationDuration: "1s" }}
                  />
                  <div className="flex justify-end">
                    <div
                      className={cn(
                        "size-3 animate-pulse rounded-full opacity-70 blur-sm",
                        POST_EMOTIONS[type].color,
                      )}
                      style={{
                        animationDuration: "2.5s",
                        animationDelay: "1s",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="aspect-square w-full max-w-7 rounded-full border border-dashed border-neutral-300" />
              )}
            </CalendarDayButton>
          );
        },
      }}
    />
  );
}
