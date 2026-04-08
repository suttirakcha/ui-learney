"use client";

import { useAuth } from "@/app/lib/AuthContext";
import { getMenusWithRole } from "@/lib/profile-menus";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const menus = user ? getMenusWithRole(user.role) : [];

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (menus.length > 0) {
      router.replace(`/profile${menus[0].href}`);
    }
  }, [isLoading, menus, router, user]);

  return (
    <div className="p-8 text-muted-foreground">
      กำลังเปิดหน้าโปรไฟล์...
    </div>
  );
}
