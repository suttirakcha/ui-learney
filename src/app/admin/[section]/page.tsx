import { redirect } from "next/navigation";
import { getAdminSectionData } from "@/lib/api/experience.service";
import { AdminSectionView } from "@/components/learney/admin/AdminConsoleView";
import { ApiResponseError } from "@/lib/api/experience.service";

export const dynamic = "force-dynamic";

type AdminSectionPageProps = {
  params: Promise<{ section: string }>;
};

function handleAdminAccessError(error: unknown): never {
  if (
    error instanceof Error &&
    /Session expired|No token provided|No refresh token|Unauthorized/i.test(
      error.message,
    )
  ) {
    redirect("/login");
  }

  if (error instanceof ApiResponseError) {
    if (error.status === 401) {
      redirect("/login");
    }

    if (error.status === 403) {
      redirect("/dashboard");
    }
  }

  throw error;
}

async function loadAdminSectionData(section: string) {
  try {
    return await getAdminSectionData(section);
  } catch (error) {
    handleAdminAccessError(error);
  }
}

export default async function AdminSectionPage({
  params,
}: AdminSectionPageProps) {
  const { section } = await params;
  const data = await loadAdminSectionData(section);

  return <AdminSectionView section={section} data={data} />;
}
