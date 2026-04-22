import { HomePageView } from "@/components/learney/public/HomePageView";
import { getHomePageData } from "@/lib/api/experience.service";
import { getActiveHomeShowcase } from "@/modules/home-showcase/services/home-showcase.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const dataPromise = getHomePageData();
  let initialShowcaseState: "ready" | "empty" | "error" = "empty";
  let initialShowcase = null;

  try {
    initialShowcase = await getActiveHomeShowcase();
    initialShowcaseState = initialShowcase ? "ready" : "empty";
  } catch (error) {
    console.error("Failed to preload home showcase:", error);
    initialShowcaseState = "error";
  }

  const data = await dataPromise;

  return (
    <HomePageView
      data={data}
      initialShowcase={initialShowcase}
      initialShowcaseState={initialShowcaseState}
    />
  );
}
