import { redirect } from "next/navigation";
import { AdminOverviewView } from "@/components/learney/admin/AdminConsoleView";
import {
  ApiResponseError,
  getAdminOverviewData,
} from "@/lib/api/experience.service";

export const dynamic = "force-dynamic";

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

async function loadAdminOverviewData() {
  try {
    return await getAdminOverviewData();
  } catch (error) {
    handleAdminAccessError(error);
  }
}

export default async function AdminPage() {
  const data = await loadAdminOverviewData();

  return <AdminOverviewView data={data} />;
}
