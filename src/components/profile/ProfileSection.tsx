"use client";

import { useAuth } from "@/app/lib/AuthContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { getMenusWithRole } from "@/lib/profile-menus";

interface ProfileSectionProps {
  path: string;
}

export default function ProfileSection({ path }: ProfileSectionProps) {
  const { user } = useAuth();
  const USER_ROLE = user?.role ?? "USER";
  const menus = getMenusWithRole(USER_ROLE);

  const profileComponent = menus.find(
    (menu) => menu.href === `/${path}`,
  )?.component;
  return (
    <div>
      <ProfileHeader user={user} />
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10 p-8">
        <div>
          <ProfileSidebar role={USER_ROLE} />
        </div>
        <div className="lg:col-span-3">{profileComponent}</div>
      </div>
    </div>
  );
}
