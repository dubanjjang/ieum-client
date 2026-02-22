import { Outlet } from "react-router";

import NavigationBar from "@/shared/ui/navigation-bar";

export default function MainLayout() {
  return (
    <>
      <main className="flex-1 bg-white pb-[calc(var(--nav-height)+var(--safe-padding))]">
        <Outlet />
      </main>
      <NavigationBar />
    </>
  );
}
