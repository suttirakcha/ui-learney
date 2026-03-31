import { redirect } from "next/navigation";

import CourseCard from "@/components/admin/course-card";
import { getPendingServer } from "@/lib/api/admin/admin.service";
import { Course } from "@/types/admin/type-admin";

export default async function PendingPage() {
  let courses;

  try {
    courses = await getPendingServer();
  } catch {
    redirect("/login");
  }

  if (!courses) redirect("/login");

  return (
    <div className="p-6">
      {" "}
      <h1 className="text-2xl font-bold mb-4">Pending Courses</h1>
      <div className="space-y-4">
        {courses.map((course: Course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
