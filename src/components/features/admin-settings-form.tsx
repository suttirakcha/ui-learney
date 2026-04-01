export default function AdminSettingsForm() {
  return (
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
        <label className="text-sm text-gray-500">Platform Commission (%)</label>
        <input
          className="w-full mt-1 p-3 rounded-xl bg-gray-100 outline-none"
          defaultValue="15"
        />
      </div>

      <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-xl">
        บันทึกการเปลี่ยนแปลง
      </button>
    </div>
  );
}
