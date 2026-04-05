import CourseDetailsPage from "@/components/course/coursedetails/DetailPage";
import { getCourseById } from "@/lib/api/course/course.service";
import { notFound } from "next/navigation";

interface DetailCourseProps {
  params: Promise<{ courseId: string }>;
}

export default async function DetailCourse({ params }: DetailCourseProps) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);

  if (!course) {
    return notFound();
  }

  return <CourseDetailsPage course={course} />;
}
