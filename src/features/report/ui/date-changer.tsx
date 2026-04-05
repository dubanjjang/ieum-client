import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/ui/button";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

export default function DateChanger({ date, setDate }: Props) {
  const now = new Date();
  const isNextDisabled =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() >= now.getMonth();

  function handleChangeMonth(direction: "prev" | "next") {
    switch (direction) {
      case "prev":
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        break;
      case "next":
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
        break;
    }
  }

  return (
    <div className="relative">
      <p className="text-xs text-neutral-500">{date.getFullYear()}</p>
      <p className="text-lg">{`${date.getMonth() + 1}월의 감정`}</p>

      <div className="absolute right-0 bottom-0 flex gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          className="p-1"
          aria-label="이전 달 버튼"
          onClick={() => handleChangeMonth("prev")}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="p-1 disabled:bg-transparent"
          aria-label="다음 달 버튼"
          disabled={isNextDisabled}
          onClick={() => handleChangeMonth("next")}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
