import { WorkspaceSectionClient } from "@/components/workspace/WorkspaceSectionClient";
import { WorkspaceShell } from "@/components/workspace/WorkspaceShell";
import { loadWorkspacePage } from "@/lib/workspace-route";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { session, data } = await loadWorkspacePage("admin");

  return (
    <WorkspaceShell
      role="admin"
      session={session}
      title={data.title}
      description={data.description}
    >
      <WorkspaceSectionClient role="admin" section="overview" data={data} />
    </WorkspaceShell>
  );
}

