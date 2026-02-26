import {
  CalendarDays,
  ClipboardList,
  type LucideIcon,
  MessageCircleHeart,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router";

import { cn } from "@/shared/lib/utils";

type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "이음글",
    path: "/home",
    icon: MessageCircleHeart,
  },
  {
    label: "감정 캘린더",
    path: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "감정 리포트",
    path: "/report",
    icon: ClipboardList,
  },
  {
    label: "마이 페이지",
    path: "/setting",
    icon: UserRound,
  },
];

export default function NavigationBar() {
  return (
    <nav className="fixed bottom-0 z-100 mx-auto flex h-(--nav-height) w-full max-w-105 items-center justify-around border-t border-neutral-200 bg-white pb-(--safe-padding)">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <div
                className={cn(
                  "flex size-(--nav-height) flex-col items-center justify-center gap-1 transition-colors duration-200 ease-out",
                  !isActive && "text-neutral-200",
                )}
              >
                <Icon className="size-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
