"use client";

import type { User } from "@/app/lib/AuthContext";
import ProfileRoleBadge from "@/components/profile/ProfileRoleBadge";
import { getProfileRolePresentation } from "@/lib/profile-role";

interface ProfileHeaderProps {
  user: User | null;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const role = user?.role ?? "USER";
  const { description } = getProfileRolePresentation(role);
  const displayName = user?.fullname ?? "โปรไฟล์ของฉัน";
  const avatarInitial = displayName.trim().charAt(0) || role.charAt(0);

  return (
    <div className="bg-primary text-white">
      <div className="mx-auto flex max-w-7xl w-full flex-col gap-6 p-8 sm:flex-row sm:items-center">
        {user?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={displayName}
            className="h-32 w-32 rounded-full border-4 border-accent/30 object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full border-4 border-accent/30 flex items-center justify-center text-5xl font-bold hover:border-accent transition cursor-pointer">
            {avatarInitial}
          </div>
        )}
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-white/70">{description}</p>
            <h1 className="text-4xl font-bold sm:text-5xl">{displayName}</h1>
          </div>
          <ProfileRoleBadge role={role} variant="inverse" />
          {user?.email && <p className="text-lg text-white/80">{user.email}</p>}
        </div>
      </div>
    </div>
  );
}
