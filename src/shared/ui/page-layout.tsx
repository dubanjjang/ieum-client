import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
  hasHeader?: boolean;
  children: ReactNode;
}

export default function PageLayout({ hasHeader = false, children }: Props) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col px-5",
        hasHeader ? "pt-4 pb-8" : "py-8",
      )}
    >
      {children}
    </div>
  );
}
