import { getPromotionsData } from "@/lib/api/experience.service";
import { PromotionsPageView } from "@/components/learney/public/PromotionsPageView";

export default async function PromotionsPage() {
  const data = await getPromotionsData();

  return <PromotionsPageView data={data} />;
}
