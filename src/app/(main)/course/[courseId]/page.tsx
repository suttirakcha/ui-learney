import { redirect } from "next/navigation";

interface DetailCourseProps {
  params: Promise<{ courseId: string }>;
}

export default async function LegacyDetailCourse({
  params,
}: DetailCourseProps) {
  const { courseId } = await params;
  redirect(`/courses/${courseId}`);
}
