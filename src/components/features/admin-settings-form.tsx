export default function AdminSettingsForm() {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-gray-500">ชื่อผู้ดูแลระบบ</label>
        <input
          className="w-full mt-1 p-3 rounded-xl bg-gray-100 outline-none"
          value="แอดมิน ระบบ"
          readOnly
        />
      </div>

      <div>
        <label className="text-sm text-gray-500">อีเมล</label>
        <input
          className="w-full mt-1 p-3 rounded-xl bg-gray-100 outline-none"
          value="admin@learny.com"
          readOnly
        />
      </div>

      <div>
        <label className="text-sm text-gray-500">
          ค่าคอมมิชชันแพลตฟอร์ม (%)
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
  );
}
