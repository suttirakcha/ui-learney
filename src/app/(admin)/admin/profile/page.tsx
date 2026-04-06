import { redirect } from "next/navigation";
import CourseCard from "@/components/admin/course-card";
import {
  getPendingServer,
  getDashboardServer,
} from "@/lib/api/admin/admin.service";
import { Course } from "@/types/admin/course";

export default async function AdminProfilePage() {
  let courses: Course[] = [];
  let dashboard;

  try {
    // 🔥 ดึง 2 อย่างพร้อมกัน
    [courses, dashboard] = await Promise.all([
      getPendingServer(),
      getDashboardServer(),
    ]);
  } catch {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* HEADER */}
      <div className="bg-cyan-500 text-white p-6 rounded-xl mb-8">
        <h1 className="text-2xl font-bold">แอดมิน ระบบ</h1>
        <p>admin@learney.com</p>
      </div>

      {/* ================= OVERVIEW ================= */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card title="Total Revenue" value={dashboard.totalRevenue} />
        <Card title="Platform Fee" value={dashboard.platformFee} />
        <Card title="Total Sales" value={dashboard.totalSales} />
        <Card title="Total Courses" value={dashboard.totalCourses} />
        <Card title="Pending Approvals" value={courses.length} />
      </div>

      {/* ================= PENDING ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Pending Courses (รออนุมัติ)</h2>

        {courses.length === 0 ? (
          <p className="text-gray-500">🎉 ไม่มีคอร์สรออนุมัติ</p>
        ) : (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        )}
      </div>
    </div>
  );
}

// ================= CARD =================
function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}
