import type { InstructorCourseView } from "@/types/profile";
import { CalendarDays, Star, Users } from "lucide-react";

interface InstructorCourseCardProps {
  course: InstructorCourseView;
}

const STATUS_LABELS: Record<InstructorCourseView["status"], string> = {
  PENDING: "รอตรวจสอบ",
  ACTIVE: "เปิดสอน",
  DRAFT: "ฉบับร่าง",
  CANCELLED: "ยกเลิก",
};

const STATUS_CLASSES: Record<InstructorCourseView["status"], string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  ACTIVE: "border-emerald-200 bg-emerald-50 text-emerald-700",
  DRAFT: "border-slate-200 bg-slate-50 text-slate-700",
  CANCELLED: "border-rose-200 bg-rose-50 text-rose-700",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export default function InstructorCourseCard({
  course,
}: InstructorCourseCardProps) {
  return (
    <div className="p-6 border border-accent rounded-lg space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium text-primary">{course.category}</p>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${STATUS_CLASSES[course.status]}`}
            >
              {STATUS_LABELS[course.status]}
            </span>
          </div>
          <h2 className="text-lg font-medium">{course.courseName}</h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Users className="w-4 h-4" />
              {course.students} ผู้เรียน
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Star className="w-4 h-4" />
              {course.rating.toFixed(1)} คะแนนรีวิว
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <CalendarDays className="w-4 h-4" />
              สร้างเมื่อ {formatDate(course.createdAt)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-primary/30 p-4">
          <h3 className="text-accent-foreground">ผู้เรียนทั้งหมด</h3>
          <p className="text-xl font-semibold">{course.students}</p>
        </div>
        <div className="rounded-lg bg-success/10 p-4">
          <h3 className="text-accent-foreground">คะแนนรีวิวเฉลี่ย</h3>
          <p className="text-xl font-semibold text-success">
            {course.rating.toFixed(1)}
          </p>
        </div>
        <div className="rounded-lg bg-primary/10 p-4">
          <h3 className="text-accent-foreground">รายได้รวม</h3>
          <p className="text-xl font-semibold text-primary">
            {formatCurrency(course.revenue)}
          </p>
        </div>
      </div>
    </div>
  );
}
