import {
  BookText,
  RefreshCw,
  UserRoundPen,
  UserRoundSearch,
} from "lucide-react";
import type { ComponentProps } from "react";

import SettingItem from "@/features/setting/ui/setting-item";
import UserProfile from "@/features/setting/ui/user-profile";
import { Card } from "@/shared/ui/card";
import PageLayout from "@/shared/ui/page-layout";
import Section from "@/shared/ui/section";

const SETTING_ITEMS: ComponentProps<typeof SettingItem>[] = [
  { icon: UserRoundPen, label: "계정 관리" },
  { icon: UserRoundSearch, label: "개인정보 수집 및 이용" },
  { icon: BookText, label: "서비스 이용약관" },
  {
    icon: RefreshCw,
    label: "버전 정보 1.00",
    rightElement: (
      <p className="truncate text-sm text-neutral-400">최신 버전</p>
    ),
  },
];

export default function SettingPage() {
  return (
    <PageLayout>
      <Section title="마이페이지">
        <div className="space-y-8">
          <Card className="overflow-hidden p-4">
            <UserProfile />
          </Card>

          <div className="space-y-4">
            {SETTING_ITEMS.map((item) => (
              <SettingItem key={item.label} {...item} />
            ))}
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
