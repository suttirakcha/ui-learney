import { getCommunityData } from "@/lib/api/experience.service";
import { CommunityPageView } from "@/components/learney/public/CommunityPageView";

type CommunityPageProps = {
  searchParams: Promise<{ courseId?: string }>;
};

export default async function CommunityPage({
  searchParams,
}: CommunityPageProps) {
  const { courseId } = await searchParams;
  const data = await getCommunityData(courseId);

  return <CommunityPageView data={data} />;
}
