import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "@/shared/lib/utils";
import { Progress } from "@/shared/ui/progress";

interface Props extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  stepCount?: number;
  stepLabelList?: string[];
  stepClassName?: string;
  indicatorClassName?: string;
}

export default function StepProgress({
  stepCount = 2,
  stepLabelList,
  stepClassName,
  className,
  indicatorClassName,
  value,
  ...props
}: Props) {
  const base = 100 / stepCount;
  const completedStep = Math.min(
    value ? Math.floor(value / base) : 0,
    stepCount - 1,
  );
  const progressValue =
    stepCount <= 1 ? 100 : (completedStep / (stepCount - 1)) * 100;

  return (
    <div className="relative">
      <Progress
        value={progressValue}
        {...props}
        className={cn("h-1", className)}
        indicatorClassName={indicatorClassName}
      />

      <div className="absolute inset-y-0 left-0 flex w-full items-center justify-between">
        {Array.from({ length: stepCount }).map((_, i) => (
          <div key={i} className="relative">
            <div
              className={cn(
                "bg-primary-foreground flex size-7 items-center justify-center rounded-full text-center text-sm font-medium text-white select-none",
                i <= completedStep &&
                  "bg-primary text-primary-foreground border-none",
                stepClassName,
              )}
            >
              {i + 1}
            </div>
            {stepLabelList?.[i] && (
              <p
                className={cn(
                  "text-primary-foreground absolute top-full left-1/2 mt-1 -translate-x-1/2 text-xs font-medium whitespace-nowrap",
                  i <= completedStep && "text-primary",
                )}
              >
                {stepLabelList[i]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
