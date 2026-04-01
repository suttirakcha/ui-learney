import CourseDetailsPage from "@/components/course/coursedetails/DetailPage";

export default async function DetailCourse({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return <CourseDetailsPage courseId={courseId} />;
}
