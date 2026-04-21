import { getCareerRecommendationsData } from "@/lib/api/experience.service";
import { CareerRecommendationView } from "@/components/learney/public/SkillTestViews";

type SkillCareerPageProps = {
  params: Promise<{ attemptId: string }>;
};

export default async function SkillCareerPage({
  params,
}: SkillCareerPageProps) {
  const { attemptId } = await params;
  const careers = await getCareerRecommendationsData(attemptId);

  return <CareerRecommendationView careers={careers} attemptId={attemptId} />;
}
