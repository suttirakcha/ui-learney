import { getSkillTestIntroData } from "@/lib/api/experience.service";
import { SkillAgeSelectionView } from "@/components/learney/public/SkillTestViews";

export const dynamic = "force-dynamic";

export default async function SkillAgePage() {
  const data = await getSkillTestIntroData();

  return <SkillAgeSelectionView data={data} />;
}
