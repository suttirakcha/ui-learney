import { getSkillTestIntroData } from "@/lib/api/experience.service";
import { SkillTestIntroView } from "@/components/learney/public/SkillTestViews";

export default async function SkillTestPage() {
  const data = await getSkillTestIntroData();

  return <SkillTestIntroView data={data} />;
}
