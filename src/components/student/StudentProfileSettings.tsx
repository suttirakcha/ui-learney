"use client";

import { useAuth } from "@/app/lib/AuthContext";
import AccountForm from "@/components/profile/AccountForm";
import SecurityCard from "@/components/profile/SecurityCard";

export default function StudentProfileSettings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <AccountForm
        defaultFullname={user?.fullname}
        defaultEmail={user?.email}
        title="การตั้งค่าบัญชี"
      />
      <SecurityCard />
    </div>
  );
}
