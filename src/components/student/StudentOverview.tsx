"use client";

import StudentRecentCourseCard from "./StudentRecentCourseCard";
import StudentInfoCard from "./StudentInfoCard";
import { useStudentOverview } from "./useStudentOverview";

function formatDate(value: string | null) {
  if (!value) {
    return "ยังไม่มีข้อมูลวันที่ซื้อ";
  }

  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export default function StudentOverview() {
  const { data, error, loading } = useStudentOverview();

  if (loading) {
    return (
      <div className="rounded-xl border border-accent p-6 text-muted-foreground">
        กำลังโหลดข้อมูลโปรไฟล์...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-destructive">
        {error}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const latestCourses = data.courses.slice(0, 3);
  const latestPurchaseDate = latestCourses[0]?.purchasedAt ?? null;
  const categoryCount = new Set(data.courses.map((course) => course.category))
    .size;

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">ภาพรวมการเรียนของฉัน</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-accent bg-background p-4">
            <p className="text-sm text-muted-foreground">หมวดหมู่ที่เคยเรียน</p>
            <p className="mt-2 text-2xl font-semibold">
              {categoryCount.toLocaleString("th-TH")} หมวด
            </p>
          </div>
          <div className="rounded-xl border border-accent bg-background p-4">
            <p className="text-sm text-muted-foreground">ซื้อคอร์สล่าสุดเมื่อ</p>
            <p className="mt-2 text-2xl font-semibold">
              {formatDate(latestPurchaseDate)}
            </p>
          </div>
        </div>

        <StudentInfoCard stats={data.stats} />
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">คอร์สล่าสุด</h2>
          <p className="text-sm text-muted-foreground">
            แสดงเฉพาะคอร์ส 3 รายการล่าสุดที่คุณเพิ่งซื้อหรือเริ่มเรียน
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {latestCourses.length > 0 ? (
            latestCourses.map((course) => (
              <StudentRecentCourseCard key={course.courseId} course={course} />
            ))
          ) : (
            <div className="rounded-lg border-2 border-dashed border-accent p-6 text-muted-foreground xl:col-span-3">
              ยังไม่มีคอร์สที่ลงเรียนในตอนนี้
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
