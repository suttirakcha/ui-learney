import { WorkspaceSectionClient } from "@/components/workspace/WorkspaceSectionClient";
import { WorkspaceShell } from "@/components/workspace/WorkspaceShell";
import { loadWorkspacePage } from "@/lib/workspace-route";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ section: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminSectionPage({
  params,
  searchParams,
}: PageProps) {
  const { section } = await params;
  const query = await searchParams;
  const queryString = new URLSearchParams(
    Object.entries(query ?? {}).flatMap(([key, value]) =>
      Array.isArray(value)
        ? value.map((item) => [key, item])
        : typeof value === "string"
          ? [[key, value]]
          : [],
    ),
  ).toString();
  const { session, data } = await loadWorkspacePage("admin", section, queryString);

  return (
    <WorkspaceShell
      role="admin"
      session={session}
      title={data.title}
      description={data.description}
    >
      <WorkspaceSectionClient role="admin" section={section} data={data} />
    </WorkspaceShell>
  );
}

