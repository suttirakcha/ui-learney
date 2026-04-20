import { getHomePageData } from "@/lib/api/experience.service";
import { HomePageView } from "@/components/learney/public/HomePageView";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getHomePageData();

  return <HomePageView data={data} />;
}
