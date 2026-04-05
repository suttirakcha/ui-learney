import Link from "next/link";
// import PendingStats from "@/components/admin/pending-courses/PendingStats";
import PendingCourseCard from "@/components/admin/pending-courses/PendingCourseCard";
import EmptyState from "@/components/admin/pending-courses/EmptyState";
import { Course } from "@/types/course";

export default function PendingCoursesPage() {
  const courses: Course[] = [
    {
      id: "1",
      courseName: "sdsdsd",
      instructor: "ครูสมหญิง",
      category: "marketing",
      price: 544545,
      description: "dsdsd",
      rating: 0,
      students: 0,
      level: "Beginner",
      duration: "900",
      thumbnail: "",
      willLearnMessages: [],
      requirements: [],
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <Link href="/profile/overview" className="text-sm text-muted-foreground">
        ← กลับไปยังโปรไฟล์
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">อนุมัติคอร์สที่รอตรวจสอบ</h1>
          <p className="text-sm text-muted-foreground">
            ตรวจสอบและอนุมัติคอร์สจากผู้สอน
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">คอร์สที่รออนุมัติ</p>
          <p className="text-2xl font-bold text-primary">{courses.length}</p>
        </div>
      </div>

      {/* <PendingStats courses={courses} /> */}

      {courses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <PendingCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
