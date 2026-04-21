import { getRecommendedCoursesData } from "@/lib/api/experience.service";
import { RecommendedCoursesView } from "@/components/learney/public/SkillTestViews";

type SkillCoursePageProps = {
  params: Promise<{ attemptId: string }>;
};

export default async function SkillCoursePage({
  params,
}: SkillCoursePageProps) {
  const { attemptId } = await params;
  const courses = await getRecommendedCoursesData(attemptId);

  return <RecommendedCoursesView courses={courses} attemptId={attemptId} />;
}
