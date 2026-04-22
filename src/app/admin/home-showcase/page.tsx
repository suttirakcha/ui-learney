import { WorkspaceShell } from "@/components/workspace/WorkspaceShell";
import { getWorkspaceSession } from "@/lib/api/workspace.service";
import { handleWorkspaceError } from "@/lib/workspace-route";
import { HomeShowcaseList } from "@/modules/admin-home-showcase/components/HomeShowcaseList";

export const dynamic = "force-dynamic";

export default async function AdminHomeShowcasePage() {
  const session = await getWorkspaceSession().catch((error) =>
    handleWorkspaceError(error),
  );

  return (
    <WorkspaceShell
      role="admin"
      session={session}
      title="Home Showcase"
      description="จัดการ Hero showcase ของหน้า Home ด้วยข้อมูลจริงจาก backend และ fallback ที่ปลอดภัย"
    >
      <HomeShowcaseList />
    </WorkspaceShell>
  );
}
