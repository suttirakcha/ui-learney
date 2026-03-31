"use client";

import ProfileHeader from "@/components/profile/ProfileHeader";
import Sidebar from "@/components/profile/Sidebar";
import InstructorForm from "@/components/profile/InstructorForm";
import SecurityCard from "@/components/profile/SecurityCard";

export default function InstructorProfilePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <ProfileHeader />

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 p-6">
        <Sidebar role="instructor" />

        <div className="md:col-span-3 space-y-6">
          <InstructorForm />
          <SecurityCard />
        </div>
      </div>
    </div>
  );
}
