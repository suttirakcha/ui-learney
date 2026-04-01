import AdminSettingsForm from "@/components/features/admin-settings-form";
import AdminProfileOverview from "@/components/profile/admin/AdminProfileOverview";
import InstructorOverview from "@/components/profile/instructor/InstructorOverview";
import InstructorSettings from "@/components/profile/instructor/InstructorSettings";
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
    label: "ภาพรวม",
    icon: <User />,
    href: "/overview",
    component: <InstructorOverview />,
  },
  {
    label: "การตั้งค่า",
    icon: <Settings />,
    href: "/settings",
    component: <InstructorSettings />,
  },
];

const adminMenus: Menu[] = [
  {
    label: "ภาพรวม",
    icon: <User />,
    href: "/overview",
    component: <AdminProfileOverview />,
  },
  {
    label: "การตั้งค่า",
    icon: <Settings />,
    href: "/settings",
    component: <AdminSettingsForm />,
  },
];

const studentMenus: Menu[] = [
  {
    label: "ภาพรวม",
    icon: <User />,
    href: "/overview",
    component: <OverviewPage />,
  },
  {
    label: "ประวัติคอร์สเรียน",
    icon: <BookOpen />,
    href: "/history",
    component: <HistoryPage />,
  },
  {
    label: "การตั้งค่า",
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
