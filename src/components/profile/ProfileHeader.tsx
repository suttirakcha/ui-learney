"use client";

import { User } from "@/app/lib/AuthContext";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-primary text-white">
      <div className="max-w-7xl w-full p-8 flex items-center mx-auto gap-6">
        <div className="w-32 h-32 rounded-full border-4 border-accent/30 flex items-center justify-center text-5xl font-bold hover:border-accent transition cursor-pointer">
          {user?.fullname?.[0] ?? "A"}
        </div>
        <div className="space-y-2">
          {/* Full name */}
          <h1 className="text-5xl font-bold">{user?.fullname}</h1>

          {/* Email */}
          <p className="text-xl">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
