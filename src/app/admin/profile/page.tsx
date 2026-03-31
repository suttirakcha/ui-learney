import ProfileHeader from "@/components/profile/ProfileHeader";

import Sidebar from "@/components/admin/Sidebar";
import Alerts from "@/components/admin/Alerts";
import RecentActions from "@/components/admin/RecentActions";
import StatsCard from "@/components/admin/StatsCard";

export default function AdminProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* HEADER */}
      <ProfileHeader />

      <div className="flex gap-6">
        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <div className="flex-1 space-y-6">
          <h2 className="text-xl font-semibold">Platform Overview</h2>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            <StatsCard title="ผู้ใช้ทั้งหมด" value="15,847" />
            <StatsCard title="Active Users" value="8,923" />
            <StatsCard title="รายได้แพลตฟอร์ม" value="$35,185" />
            <StatsCard title="รายได้รวม" value="$234,567" />
            <StatsCard title="คอร์สทั้งหมด" value="487" />
            <StatsCard title="รออนุมัติ" value="12" />
          </div>

          {/* ALERT */}
          <Alerts />

          {/* RECENT */}
          <RecentActions />
        </div>
      </div>
    </main>
  );
}
