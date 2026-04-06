"use client";

import StudentHistoryListItem from "./StudentHistoryListItem";
import { useStudentOverview } from "./useStudentOverview";

export default function StudentHistory() {
  const { data, error, loading } = useStudentOverview();

  if (loading) {
    return (
      <div className="rounded-xl border border-accent p-6 text-muted-foreground">
        กำลังโหลดประวัติคอร์สเรียน...
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

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">
            ประวัติคอร์สเรียนทั้งหมด ({data.courses.length.toLocaleString("th-TH")}{" "}
            รายการ)
          </h2>
          <p className="text-sm text-muted-foreground">
            เรียงจากรายการล่าสุดไปเก่าสุด เพื่อให้ย้อนดูคอร์สที่เคยซื้อได้ง่าย
          </p>
        </div>
        <div className="space-y-4">
          {data.courses.length > 0 ? (
            data.courses.map((course) => (
              <StudentHistoryListItem key={course.courseId} course={course} />
            ))
          ) : (
            <div className="rounded-lg border-2 border-dashed border-accent p-6 text-muted-foreground">
              ยังไม่มีประวัติคอร์สเรียน
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
