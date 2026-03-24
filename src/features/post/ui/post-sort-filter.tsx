import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export type SortType = "latest" | "nearest" | "most-liked";

interface Props {
  sortType: SortType;
  onChange: (sortType: SortType) => void;
}

const SORT_OPTIONS = [
  {
    value: "latest",
    label: "최신순",
  },
  {
    value: "nearest",
    label: "거리순",
  },
  {
    value: "most-liked",
    label: "공감순",
  },
] as const;

export default function PostSortFilter({ sortType, onChange }: Props) {
  return (
    <div className="bg-background flex w-full gap-x-2 px-3 py-2">
      {SORT_OPTIONS.map(({ value, label }) => (
        <Button
          key={value}
          variant="ghost"
          size="sm"
          onClick={() => onChange(value)}
          className={cn(
            "h-7 rounded-full text-sm",
            sortType === value
              ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
