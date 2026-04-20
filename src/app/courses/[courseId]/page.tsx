import { getCourseDetailData } from "@/lib/api/experience.service";
import { CourseDetailView } from "@/components/learney/public/CourseDetailView";

type CourseDetailPageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { courseId } = await params;
  const data = await getCourseDetailData(courseId);

  return <CourseDetailView data={data} />;
}
