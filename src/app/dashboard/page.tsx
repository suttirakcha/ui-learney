import { getDashboardData } from "@/lib/api/experience.service";
import { DashboardView } from "@/components/learney/public/DashboardView";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return <DashboardView data={data} />;
}
