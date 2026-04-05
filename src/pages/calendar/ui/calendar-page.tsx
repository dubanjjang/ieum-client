import { useState } from "react";

import EmotionCalendar from "@/features/calendar/ui/emotion-calendar";
import { Drawer, DrawerContent } from "@/shared/ui/drawer";
import Section from "@/shared/ui/section";
import PostList from "@/widgets/post/ui/post-list";

export default function CalendarPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col px-5 py-8">
      <Section
        title="🗓️ 감정 캘린더"
        description="작성한 메시지와 감정을 확인할 수 있어요."
        className="flex flex-1 flex-col"
      >
        <EmotionCalendar onClickDay={() => setOpen((prev) => !prev)} />
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="z-101">
            <PostList />
          </DrawerContent>
        </Drawer>
      </Section>
    </div>
  );
}
