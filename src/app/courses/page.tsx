import { getCatalogData } from "@/lib/api/experience.service";
import { CatalogPageView } from "@/components/learney/public/CatalogPageView";

type CoursesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string" && value) {
      query.set(key, value);
    }
  });

  const data = await getCatalogData(query.toString());

  return <CatalogPageView data={data} />;
}
