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

  return (
    <div>
      <h1>Pending</h1>

      {courses.map((course: Course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
