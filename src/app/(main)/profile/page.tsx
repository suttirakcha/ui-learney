"use client";

import { useAuth } from "@/app/lib/AuthContext";
import { getMenusWithRole } from "@/lib/profile-menus";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const menus = getMenusWithRole(user?.role ?? "USER");

  useEffect(() => {
    if (menus.length > 0) {
      router.replace(`/profile${menus[0].href}`);
    }
  }, [menus, router]);

  return <div className="p-8 text-muted-foreground">กำลังเปิดหน้าโปรไฟล์...</div>;
}
