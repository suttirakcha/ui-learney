import { getSkillTestIntroData } from "@/lib/api/experience.service";
import { SkillQuestionView } from "@/components/learney/public/SkillTestViews";

type SkillQuestionPageProps = {
  searchParams: Promise<{
    ageGroup?: string;
    courseId?: string;
    assessmentKind?: string;
    sourceType?: string;
  }>;
};

export default async function SkillQuestionPage({
  searchParams,
}: SkillQuestionPageProps) {
  const {
    ageGroup = "Working Age (23+)",
    courseId,
    assessmentKind,
    sourceType,
  } = await searchParams;

  const data = await getSkillTestIntroData(ageGroup);

  return (
    <SkillQuestionView
      data={data}
      ageGroup={ageGroup}
      courseId={courseId}
      assessmentKind={assessmentKind}
      sourceType={sourceType}
    />
  );
}
