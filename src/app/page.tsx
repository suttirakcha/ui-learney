import { HomePageView } from "@/components/learney/public/HomePageView";
import { getHomePageData } from "@/lib/api/experience.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getHomePageData();

  return <HomePageView data={data} />;
}
