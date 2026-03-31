import ProfileHeader from "@/components/profile/ProfileHeader";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminSettingsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* HEADER */}
      <ProfileHeader />

      <div className="flex gap-6">
        {/* SIDEBAR */}
        <Sidebar active="settings" />

        {/* CONTENT */}
        <div className="flex-1 space-y-6">
          {/* SETTINGS CARD */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold">Admin Settings</h2>

            {/* FORM */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-500">Admin Name</label>
                <input
                  className="w-full mt-1 p-3 rounded-xl bg-gray-100 outline-none"
                  value="แอดมิน ระบบ"
                  readOnly
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <input
                  className="w-full mt-1 p-3 rounded-xl bg-gray-100 outline-none"
                  value="admin@learny.com"
                  readOnly
                />
              </div>

              {/* Commission */}
              <div>
                <label className="text-sm text-gray-500">
                  Platform Commission (%)
                </label>
                <input
                  className="w-full mt-1 p-3 rounded-xl bg-gray-100 outline-none"
                  defaultValue="15"
                />
              </div>

              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-xl">
                บันทึกการเปลี่ยนแปลง
              </button>
            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
            <div>
              <p className="font-medium">เปลี่ยนรหัสผ่าน</p>
              <p className="text-sm text-gray-500">
                Update your password to keep your account secure
              </p>
            </div>

            <button className="px-4 py-2 border rounded-xl hover:bg-gray-100">
              แก้ไข
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
