import { getSkillResultData } from "@/lib/api/experience.service";
import { SkillResultView } from "@/components/learney/public/SkillTestViews";

type SkillResultPageProps = {
  params: Promise<{ attemptId: string }>;
};

export default async function SkillResultPage({
  params,
}: SkillResultPageProps) {
  const { attemptId } = await params;
  const data = await getSkillResultData(attemptId);

  return <SkillResultView data={data} />;
}
