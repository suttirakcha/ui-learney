import { Button } from "@/components/ui/button";
import type { StudentOverviewCourse } from "@/types/profile";
import Link from "next/link";

interface StudentCourseCardProps {
  course?: StudentOverviewCourse;
  ctaLabel?: string;
}

function formatPurchasedAt(value: string | null) {
  if (!value) {
    return "ยังไม่มีวันที่ซื้อ";
  }

  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export default function StudentCourseCard({
  course,
  ctaLabel = "ดูรายละเอียดคอร์ส",
}: StudentCourseCardProps) {
  if (!course) {
    return (
      <div className="rounded-lg border-2 border-dashed border-accent p-6 text-muted-foreground">
        ยังไม่มีคอร์สในรายการนี้
      </div>
    );
  }

  return (
    <div className="p-6 border-2 border-accent rounded-lg space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">{course.category}</p>
          <h2 className="text-lg font-medium text-black">{course.courseName}</h2>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>ผู้สอน: {course.instructorName}</p>
            <p>วันที่ซื้อ: {formatPurchasedAt(course.purchasedAt)}</p>
          </div>
        </div>

        <Button asChild>
          <Link href={`/course/${course.courseId}`}>{ctaLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
