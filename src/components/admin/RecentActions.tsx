export default function RecentActions() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="font-semibold">Recent Actions</h3>

      <div className="space-y-3">
        <div className="border-b pb-2">
          <p className="font-medium">อนุมัติคอร์ส</p>
          <p className="text-sm text-gray-500">
            Python Bootcamp - 1 ชั่วโมงที่ผ่านมา
          </p>
        </div>

        <div className="border-b pb-2">
          <p className="font-medium">ผู้ใช้ถูกยืนยัน</p>
          <p className="text-sm text-gray-500">Instructor: Jane Doe</p>
        </div>

        <div>
          <p className="font-medium">แก้ไขปัญหา</p>
          <p className="text-sm text-gray-500">Payment timeout</p>
        </div>
      </div>
    </div>
  );
}
