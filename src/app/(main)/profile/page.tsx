"use client";

import { useAuth } from "@/app/lib/AuthContext";
import { getMenusWithRole } from "@/lib/profile-menus";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();

  const menus = getMenusWithRole(user?.role ?? "USER");
  return redirect(`/profile/${menus[0].href}`);
}
