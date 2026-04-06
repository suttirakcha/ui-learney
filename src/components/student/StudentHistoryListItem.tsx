import { Button } from "@/components/ui/button";
import type { StudentOverviewCourse } from "@/types/profile";
import Link from "next/link";

interface StudentHistoryListItemProps {
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

export default function StudentHistoryListItem({
  course,
}: StudentHistoryListItemProps) {
  return (
    <div className="rounded-xl border border-accent/80 bg-background p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-primary">{course.category}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              ซื้อเมื่อ {formatPurchasedAt(course.purchasedAt)}
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="truncate text-lg font-semibold text-foreground">
              {course.courseName}
            </h3>
            <p className="text-sm text-muted-foreground">
              ผู้สอน: {course.instructorName}
            </p>
          </div>
        </div>

        <Button asChild variant="outline" className="w-full lg:w-auto">
          <Link href={`/course/${course.courseId}`}>ไปยังหน้าคอร์ส</Link>
        </Button>
      </div>
    </div>
  );
}
