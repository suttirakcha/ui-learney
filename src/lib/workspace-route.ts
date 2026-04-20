import { redirect } from "next/navigation";
import {
  WorkspaceApiError,
  getWorkspaceOverview,
  getWorkspaceSection,
  getWorkspaceSession,
} from "@/lib/api/workspace.service";
import type { WorkspaceRole } from "@/types/workspace";

export function handleWorkspaceError(error: unknown): never {
  if (
    error instanceof Error &&
    /session expired|no token provided|unauthorized/i.test(error.message)
  ) {
    redirect("/login");
  }

  if (error instanceof WorkspaceApiError) {
    if (error.status === 401) {
      redirect("/login");
    }

    if (error.status === 403) {
      redirect("/forbidden");
    }
  }

  throw error;
}

export async function loadWorkspacePage(
  role: WorkspaceRole,
  section?: string,
  queryString = "",
) {
  try {
    const [session, data] = await Promise.all([
      getWorkspaceSession(),
      section ? getWorkspaceSection(role, section, queryString) : getWorkspaceOverview(role),
    ]);

    return { session, data };
  } catch (error) {
    handleWorkspaceError(error);
  }
}

