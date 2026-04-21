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
      <div className="surface-card w-full rounded-2xl">
        <div className="border-b border-border/70 px-4 py-5 space-y-3">
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
                "mx-4 my-2 flex items-center gap-2 rounded-xl px-4 py-3 text-sm transition-all duration-200 hover:bg-primary/12 hover:text-foreground",
                pathname === menuLink && "btn-gradient text-primary-foreground shadow-sm",
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
          className="mx-4 mt-2 mb-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm transition-all duration-200 hover:bg-primary/12 hover:text-foreground"
        >
          <LogOut />
          <p>ออกจากระบบ</p>
        </button>
      </div>

      {role === "ADMIN" && (
        <div className="surface-card rounded-2xl p-4 space-y-2">
          <p className="text-xl font-semibold">ทางลัดสำหรับผู้ดูแลระบบ</p>

          <Link
            href="/admin/pending"
            className="flex w-full rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-primary/12 hover:text-foreground"
          >
            อนุมัติคอร์ส
          </Link>
        </div>
      )}
    </div>
  );
}
