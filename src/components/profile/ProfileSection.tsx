"use client";

import { useAuth } from "@/app/lib/AuthContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { getMenusWithRole } from "@/lib/profile-menus";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProfileSectionProps {
  path: string;
}

export default function ProfileSection({ path }: ProfileSectionProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const menus = user ? getMenusWithRole(user.role) : [];

  const profileComponent = menus.find(
    (menu) => menu.href === `/${path}`,
  )?.component;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!profileComponent && menus.length > 0) {
      router.replace(`/profile${menus[0].href}`);
    }
  }, [isLoading, menus, profileComponent, router, user]);

  if (isLoading) {
    return (
      <div>
        <ProfileHeader user={user} />
        <div className="mx-auto max-w-7xl w-full p-8 text-muted-foreground">
          กำลังโหลดข้อมูลโปรไฟล์...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!profileComponent) {
    return (
      <div>
        <ProfileHeader user={user} />
        <div className="mx-auto grid max-w-7xl w-full grid-cols-1 gap-10 p-8 lg:grid-cols-4">
          <div>
            <ProfileSidebar role={user.role} />
          </div>
          <div className="rounded-xl border border-accent p-6 text-muted-foreground lg:col-span-3">
            กำลังพาคุณไปยังหน้าที่ใช้งานได้...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProfileHeader user={user} />
      <div className="mx-auto grid max-w-7xl w-full grid-cols-1 gap-10 p-8 lg:grid-cols-4">
        <div>
          <ProfileSidebar role={user.role} />
        </div>
        <div className="lg:col-span-3">{profileComponent}</div>
      </div>
    </div>
  );
}
