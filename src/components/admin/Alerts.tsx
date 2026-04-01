import Link from "next/link";

export default function Alerts() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
      <h3 className="font-semibold">Alerts & Issues</h3>

      <div className="bg-yellow-50 border p-3 rounded-xl flex justify-between">
        <span>12 คอร์สรออนุมัติ</span>
        <Link rel="stylesheet" href="/admin/pending-courses">
          <button className="text-sm text-blue-600">Review</button>
        </Link>
      </div>

      <div className="bg-green-50 border p-3 rounded-xl flex justify-between">
        <span>5 การถอนเงินรออนุมัติ</span>
        <button className="text-sm text-blue-600">View</button>
      </div>

      <div className="bg-blue-50 border p-3 rounded-xl flex justify-between">
        <span>รายได้เพิ่มขึ้น 22%</span>
        <button className="text-sm text-blue-600">View</button>
      </div>

      <div className="bg-red-50 border p-3 rounded-xl flex justify-between">
        <span>2 ปัญหาที่ต้องแก้ไข</span>
        <button className="text-sm text-red-600">Resolve</button>
      </div>
    </div>
  );
}
