import Link from "next/link";
import { BookOpen } from "lucide-react";
import { CourseStat } from "@/types/instructor/instructor.type";

export default function CoursesGrid({ courses }: { courses: CourseStat[] }) {
  if (courses.length === 0) {
    return <div className="text-center p-6">No courses yet</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Your Courses</h2>
      {courses.map((c) => (
        <div
          key={c.courseId}
          className="bg-white p-4 rounded shadow flex justify-between items-center gap-4"
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{c.courseName}</h3>
            <p className="text-sm text-gray-500">
              {c.students} students • ⭐ {c.rating.toFixed(1)}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Sales</p>
              <p className="font-bold">{c.sales}</p>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-sm">Revenue</p>
              <p className="font-bold text-cyan-600">
                ฿{c.revenue.toLocaleString()}
              </p>
            </div>

            <Link
              href={`/instructor/courses/${c.courseId}/lessons`}
              className="flex items-center gap-1.5 rounded-lg border border-cyan-400 px-3 py-2 text-sm text-cyan-600 hover:bg-cyan-50 transition-colors shrink-0"
            >
              <BookOpen size={15} />
              จัดการบทเรียน
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
