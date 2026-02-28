import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
  title: string;
  description?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export default function Section({
  title,
  description,
  className,
  children,
}: Props) {
  return (
    <section className={cn("flex flex-col gap-y-4", className)}>
      <div className="space-y-1.5">
        <div className="flex items-center gap-x-2">
          <h1 className="truncate text-lg font-medium">{title}</h1>
        </div>
        <div className="text-muted-foreground text-sm break-all whitespace-pre-wrap">
          {description}
        </div>
      </div>

      <div className="flex flex-1 flex-col">{children}</div>
    </section>
  );
}
