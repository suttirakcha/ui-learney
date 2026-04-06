import { Button } from "@/components/ui/button";
import type { StudentOverviewCourse } from "@/types/profile";
import Link from "next/link";

interface StudentRecentCourseCardProps {
  course: StudentOverviewCourse;
}

function formatPurchasedAt(value: string | null) {
  if (!value) {
    return "ยังไม่มีวันที่ซื้อ";
  }

  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export default function StudentRecentCourseCard({
  course,
}: StudentRecentCourseCardProps) {
  return (
    <div className="rounded-xl border border-accent bg-background p-5 space-y-4">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {course.category}
          </span>
          <span className="text-xs text-muted-foreground">
            ซื้อเมื่อ {formatPurchasedAt(course.purchasedAt)}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {course.courseName}
          </h3>
          <p className="text-sm text-muted-foreground">
            ผู้สอน: {course.instructorName}
          </p>
        </div>
      </div>

      <Button asChild className="w-full sm:w-auto">
        <Link href={`/course/${course.courseId}`}>ดูรายละเอียดคอร์ส</Link>
      </Button>
    </div>
  );
}
