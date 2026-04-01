import AdminSettingsForm from "@/components/features/admin-settings-form";
import AdminProfileOverview from "@/components/profile/admin/AdminProfileOverview";
import InstructorOverview from "@/components/profile/instructor/InstructorOverview";
import InstructorProfileSettings from '@/components/profile/instructor/InstructorProfileSettings';
import HistoryPage from "@/components/student/history/HistoryPage";
import OverviewPage from "@/components/student/profile/OverviewPage";
import { Role } from "@/types/user";
import { BookOpen, Settings, User } from "lucide-react";
import { JSX, ReactNode } from "react";

type Menu = {
  label: string;
  icon: ReactNode;
  href: string;
  component: JSX.Element;
};

const instructorMenus: Menu[] = [
  {
    label: "overview",
    icon: <User />,
    href: "/overview",
    component: <InstructorOverview />,
  },
  {
    label: "settings",
    icon: <Settings />,
    href: '/settings',
    component: <InstructorProfileSettings />,
  },
];

const adminMenus: Menu[] = [
  {
    label: "overview",
    icon: <User />,
    href: "/overview",
    component: <AdminProfileOverview />,
  },
  {
    label: "settings",
    icon: <Settings />,
    href: "/settings",
    component: <AdminSettingsForm />,
  },
];

const studentMenus: Menu[] = [
  {
    label: "overview",
    icon: <User />,
    href: "/overview",
    component: <OverviewPage />,
  },
  {
    label: "history",
    icon: <BookOpen />,
    href: "/history",
    component: <HistoryPage />,
  },
  {
    label: "settings",
    icon: <Settings />,
    href: "/settings",
    component: <></>,
  },
];

const getMenusWithRole = (role: Role) => {
  return role === "INSTRUCTOR"
    ? instructorMenus
    : role === "ADMIN"
      ? adminMenus
      : studentMenus;
};

export { instructorMenus, studentMenus, getMenusWithRole };
