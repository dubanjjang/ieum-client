import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  icon: LucideIcon;
  label: string;
  rightElement?: ReactNode;
  onClick?: () => void;
}

export default function SettingItem({
  icon: Icon,
  label,
  rightElement,
  onClick,
}: Props) {
  return (
    <div
      className="flex cursor-pointer items-center gap-3 px-3 py-2"
      onClick={onClick}
    >
      <Icon className="size-5 text-neutral-400" />
      <div className="flex min-w-0 flex-1 items-center justify-between">
        <p className="truncate">{label}</p>
        {rightElement ?? <ChevronRight className="size-5 text-neutral-300" />}
      </div>
    </div>
  );
}
