"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { workspaceMenus } from "./workspace-config";
import type { WorkspaceRole, WorkspaceSession } from "@/types/workspace";

type WorkspaceShellProps = {
  role: WorkspaceRole;
  session: WorkspaceSession;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function WorkspaceShell({
  role,
  session,
  title,
  description,
  children,
}: WorkspaceShellProps) {
  const pathname = usePathname();
  const menuItems = workspaceMenus[role];

  const unreadCount = useMemo(() => {
    if (role === "admin") return session.unreadCounts.admin;
    if (role === "instructor") return session.unreadCounts.instructor;
    return session.unreadCounts.student;
  }, [role, session.unreadCounts]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffdf7_0%,#f5fbff_40%,#f7f3ff_100%)] text-slate-900 dark:bg-[linear-gradient(180deg,#11131a_0%,#171923_100%)] dark:text-slate-100">
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-200/80 bg-white/90 px-4 py-6 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold">
            <LayoutDashboard className="h-5 w-5 text-rose-500" />
            <span>Learney Console</span>
          </Link>

          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500">
              บทบาทปัจจุบัน
            </p>
            <p className="mt-2 text-lg font-semibold">{session.user.workspaceLabel}</p>
            <p className="mt-1 text-sm text-slate-500">{session.user.fullname}</p>
          </div>

          {session.workspaces.length > 1 ? (
            <div className="mt-4 space-y-2">
              <p className="text-xs uppercase tracking-[0.08em] text-slate-500">
                สลับพื้นที่ทำงาน
              </p>
              <div className="flex flex-wrap gap-2">
                {session.workspaces.map((workspace) => (
                  <Link key={workspace.key} href={workspace.path}>
                    <Button
                      variant={
                        pathname.startsWith(workspace.path) ? "default" : "outline"
                      }
                      size="sm"
                      className="h-8"
                    >
                      {workspace.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <nav className="mt-8 space-y-1">
            {menuItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "bg-rose-500 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {active ? <ChevronRight className="h-4 w-4" /> : null}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200/80 bg-white/80 px-4 py-4 backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-950/60">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold">{title}</h1>
                {description ? (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {description}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-amber-500" />
                    <span>ยังไม่อ่าน {unreadCount} รายการ</span>
                  </div>
                </div>

                <Link href="/">
                  <Button variant="outline">กลับหน้าเว็บ</Button>
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6">{children}</main>
        </section>
      </div>
    </div>
  );
}

