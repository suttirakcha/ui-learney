"use client";

import { useAuth } from "@/app/lib/AuthContext";
import ProfileRoleBadge from "@/components/profile/ProfileRoleBadge";
import { getMenusWithRole } from "@/lib/profile-menus";
import { getProfileRolePresentation } from "@/lib/profile-role";
import { cn } from "@/lib/utils";
import type { Role } from "@/types/user";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProfileSidebarProps {
  role: Role;
}

export default function ProfileSidebar({ role }: ProfileSidebarProps) {
  const { logout } = useAuth();
  const menus = getMenusWithRole(role);
  const pathname = usePathname();
  const { description } = getProfileRolePresentation(role);

  return (
    <div className="space-y-4 lg:sticky top-24">
      <div className="border border-accent rounded-xl w-full">
        <div className="border-b border-accent/60 px-4 py-5 space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            {description}
          </p>
          <ProfileRoleBadge role={role} />
        </div>
        {menus.map((menu) => {
          const menuLink = `/profile${menu.href}`;
          return (
            <Link
              href={menuLink}
              key={menu.label}
              className={cn(
                "flex items-center px-4 py-3 m-4 gap-2 hover:bg-primary hover:text-white rounded-lg transition-all duration-200",
                pathname === menuLink && "bg-primary text-white",
              )}
            >
              {menu.icon}
              {menu.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => void logout()}
          className="flex items-center px-4 py-3 m-4 gap-2 hover:bg-primary hover:text-white rounded-lg transition-all duration-200"
        >
          <LogOut />
          <p>ออกจากระบบ</p>
        </button>
      </div>

      {role === "ADMIN" && (
        <div className="border border-accent rounded-xl p-4 space-y-2">
          <p className="text-xl font-semibold">ทางลัดสำหรับผู้ดูแลระบบ</p>

          <Link
            href="/admin/pending"
            className="flex w-full text-left px-4 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
          >
            อนุมัติคอร์ส
          </Link>
        </div>
      )}
    </div>
  );
}
