import ProfileSection from "@/components/profile/ProfileSection";
import { getMenusWithRole } from "@/lib/profile-menus";
import { Role } from "@/types/user";

const USER_ROLE: Role = "ADMIN";

interface InstructorProfilePageProps {
  params: { path: string };
}

export async function generateMetadata({ params }: InstructorProfilePageProps) {
  const { path } = await params;
  const menus = getMenusWithRole(USER_ROLE);

  const profileLabel = menus.find((menu) => menu.href === `/${path}`)?.label;

  return {
    title: profileLabel,
  };
}

export default async function InstructorProfilePage({
  params,
}: InstructorProfilePageProps) {
  const { path } = await params;

  return <ProfileSection path={path} />;
}
