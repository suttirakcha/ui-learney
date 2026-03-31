import InstructorOverview from '@/components/profile/instructor/InstructorOverview';
import InstructorSettings from '@/components/profile/instructor/InstructorSettings';
import StudentHistory from '@/components/student/StudentHistory';
import StudentOverview from '@/components/student/StudentOverview';
import { Role } from '@/types/user';
import { BookOpen, Settings, User } from 'lucide-react';
import { JSX, ReactNode } from 'react';

type Menu = {
  label: string;
  icon: ReactNode;
  href: string;
  component: JSX.Element;
};

const instructorMenus: Menu[] = [
  {
    label: 'ภาพรวม',
    icon: <User />,
    href: '/overview',
    component: <InstructorOverview />,
  },
  {
    label: 'การตั้งค่า',
    icon: <Settings />,
    href: '/settings',
    component: <InstructorSettings />,
  },
];

const studentMenus: Menu[] = [
  {
    label: 'ภาพรวม',
    icon: <User />,
    href: '/overview',
    component: <StudentOverview />,
  },
  {
    label: 'ประวัติคอร์สเรียน',
    icon: <BookOpen />,
    href: '/history',
    component: <StudentHistory />,
  },
  {
    label: 'การตั้งค่า',
    icon: <Settings />,
    href: '/settings',
    component: <></>,
  },
];

const getMenusWithRole = (role: Role) => {
  return role === 'INSTRUCTOR' ? instructorMenus : studentMenus;
};

export { instructorMenus, studentMenus, getMenusWithRole };
