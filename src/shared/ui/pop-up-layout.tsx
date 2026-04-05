import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import PageLayout from "@/shared/ui/page-layout";

interface Props {
  title?: string;
  headerRightContent?: ReactNode;
  className?: string;
  children: ReactNode;
  onPrev: () => void;
}

export default function PopUpLayout({
  title,
  headerRightContent,
  className,
  children,
  onPrev,
}: Props) {
  return (
    <div className={cn("flex w-full flex-col", className)}>
      <header className="flex h-12 w-full items-center justify-between gap-x-4">
        <div className="w-1/5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onPrev}
            aria-label="뒤로 가기"
          >
            <ChevronLeft className="size-6 shrink-0" />
          </Button>
        </div>

        <div className="flex-1">
          {title && (
            <h1 className="truncate text-center text-lg font-semibold">
              {title}
            </h1>
          )}
        </div>

        <div className="flex w-1/5 items-center justify-end">
          {headerRightContent}
        </div>
      </header>

      <PageLayout hasHeader>{children}</PageLayout>
    </div>
  );
}
