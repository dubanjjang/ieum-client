import { createBrowserRouter, redirect } from "react-router";

import CalendarPage from "@/pages/calendar/ui/calendar-page";
import HomePage from "@/pages/home/ui/home-page";
import LoginPage from "@/pages/login/ui/login-page";
import NotFoundPage from "@/pages/not-found/ui/not-found-page";
import ReportPage from "@/pages/report/ui/report-page";
import SettingPage from "@/pages/setting/setting-page";
import MainLayout from "@/shared/ui/main-layout";
import MobileLayout from "@/shared/ui/mobile-layout";

export const router = createBrowserRouter([
  {
    Component: MobileLayout,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            path: "/",
            loader: () => redirect("/home"),
          },
          {
            path: "/home",
            Component: HomePage,
          },
          {
            path: "/calendar",
            Component: CalendarPage,
          },
          {
            path: "/report",
            Component: ReportPage,
          },
          {
            path: "/setting",
            Component: SettingPage,
          },
        ],
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
