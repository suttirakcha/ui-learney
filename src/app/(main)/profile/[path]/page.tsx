import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
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
  const menus = getMenusWithRole(USER_ROLE);

  const profileComponent = menus.find(
    (menu) => menu.href === `/${path}`,
  )?.component;

  return (
    <div>
      <ProfileHeader />
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10 p-8">
        <div>
          <ProfileSidebar role={USER_ROLE} />
        </div>
        <div className="lg:col-span-3">{profileComponent}</div>
      </div>
    </div>
  );
}
