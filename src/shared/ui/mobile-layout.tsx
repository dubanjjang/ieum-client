import { Outlet } from "react-router";

export default function MobileLayout() {
  return (
    <div className="h-dvh">
      <div className="mx-auto flex min-h-full w-full max-w-105 flex-col bg-white">
        <Outlet />
      </div>
    </div>
  );
}
