"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import toast from "react-hot-toast";
import { Download, Eye, Filter, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  applyWorkspaceAction,
} from "@/lib/api/workspace.service";
import type {
  WorkspaceField,
  WorkspaceRole,
  WorkspaceSectionData,
} from "@/types/workspace";

const chartColors = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
];

function serializeFieldValue(value: unknown, type: WorkspaceField["type"]) {
  if (type === "checkbox") {
    return Boolean(value);
  }

  if (type === "json") {
    if (typeof value === "string") return value;
    return JSON.stringify(value ?? {}, null, 2);
  }

  if (type === "tags") {
    return Array.isArray(value) ? value.join(", ") : "";
  }

  if (value === null || typeof value === "undefined") {
    return "";
  }

  return String(value);
}

function parseFieldValue(value: string | boolean, type: WorkspaceField["type"]) {
  if (type === "checkbox") {
    return Boolean(value);
  }

  if (type === "number") {
    return value === "" ? null : Number(value);
  }

  if (type === "json") {
    if (typeof value !== "string" || !value.trim()) return {};
    return JSON.parse(value);
  }

  if (type === "tags") {
    if (typeof value !== "string") return [];
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return typeof value === "string" ? value : "";
}

function formatCellValue(value: unknown, type?: string) {
  if (type === "currency") {
    const amount = Number(value ?? 0);
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  if (type === "date") {
    if (!value) return "-";
    return new Intl.DateTimeFormat("th-TH", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(String(value)));
  }

  return String(value ?? "-");
}

function ChartCard({
  title,
  type,
  data,
}: {
  title: string;
  type: "line" | "bar" | "pie";
  data: Array<Record<string, string | number>>;
}) {
  if (!data.length) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <h3 className="mb-4 text-base font-semibold">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} />
            </LineChart>
          ) : type === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={data} dataKey="value" nameKey="label" outerRadius={96} label>
                {data.map((entry, index) => (
                  <Cell
                    key={`${entry.label}-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

type WorkspaceSectionClientProps = {
  role: WorkspaceRole;
  section: string;
  data: WorkspaceSectionData;
};

export function WorkspaceSectionClient({
  role,
  section,
  data,
}: WorkspaceSectionClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogValues, setDialogValues] = useState<Record<string, string | boolean>>({});
  const [dialogAction, setDialogAction] = useState(data.form?.action ?? "");
  const [submitting, setSubmitting] = useState(false);

  const items = useMemo(() => data.items ?? [], [data.items]);

  const buildQuery = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(next).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const openForm = (seed?: Record<string, unknown>, actionOverride?: string) => {
    const nextValues = Object.fromEntries(
      (data.form?.fields ?? []).map((field) => [
        field.key,
        serializeFieldValue(seed?.[field.key], field.type),
      ]),
    );

    setDialogAction(actionOverride ?? data.form?.action ?? "save");
    setDialogValues(nextValues);
    setDialogOpen(true);
  };

  const exportCsv = () => {
    if (!data.columns?.length || !items.length) {
      toast.error("ไม่มีข้อมูลสำหรับส่งออก");
      return;
    }

    const header = data.columns.map((column) => column.label).join(",");
    const rows = items.map((item) =>
      data.columns!
        .map((column) => {
          const value = item[column.key];
          const text = formatCellValue(value, column.type).replaceAll('"', '""');
          return `"${text}"`;
        })
        .join(","),
    );

    const content = [header, ...rows].join("\n");
    const blob = new Blob(["\ufeff" + content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${section}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const promptForActionInput = (action: string) => {
    if (action === "request_course_changes") {
      const adminNotes = window.prompt("ระบุหมายเหตุที่ต้องการให้ผู้สอนแก้ไข");
      return adminNotes ? { adminNotes } : null;
    }

    if (action === "reject_course_review") {
      const adminNotes = window.prompt("ระบุเหตุผลการปฏิเสธคอร์ส");
      return adminNotes ? { adminNotes } : null;
    }

    if (action === "request_instructor_application_changes") {
      const adminNotes = window.prompt("ระบุข้อมูลที่ผู้สมัครต้องแก้ไข");
      return adminNotes ? { adminNotes } : null;
    }

    if (action === "reject_instructor_application") {
      const adminNotes = window.prompt("ระบุเหตุผลการปฏิเสธคำขอ");
      return adminNotes ? { adminNotes } : null;
    }

    if (action === "update_course_status") {
      const status = window.prompt(
        "ระบุสถานะใหม่ เช่น แบบร่าง, เผยแพร่แล้ว, ซ่อนอยู่, ปิดรับสมัคร",
      );
      return status ? { status } : null;
    }

    return {};
  };

  const runAction = async (
    action: string,
    row?: Record<string, unknown>,
    extra?: Record<string, unknown>,
  ) => {
    try {
      setSubmitting(true);

      const result = await applyWorkspaceAction(role, section, action, {
        ...(row ?? {}),
        ...(extra ?? {}),
      });

      toast.success(result.message || "บันทึกข้อมูลเรียบร้อยแล้ว");
      router.refresh();
      setDialogOpen(false);
      setSelectedIds([]);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "ไม่สามารถบันทึกข้อมูลได้",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleRowAction = async (actionKey: string, row: Record<string, unknown>) => {
    if (actionKey === "edit") {
      openForm(row);
      return;
    }

    if (actionKey === "open_path" && typeof row.actionPath === "string") {
      router.push(row.actionPath);
      return;
    }

    const actionMeta = data.rowActions?.find((action) => action.key === actionKey);
    if (actionMeta?.confirm) {
      const confirmed = window.confirm("ยืนยันการดำเนินการนี้หรือไม่");
      if (!confirmed) return;
    }

    const extraPayload = promptForActionInput(actionKey);
    if (extraPayload === null) return;

    await runAction(actionKey, row, extraPayload);
  };

  const handleSubmitDialog = async () => {
    if (!data.form) return;

    try {
      const payload = Object.fromEntries(
        data.form.fields.map((field) => [
          field.key,
          parseFieldValue(dialogValues[field.key] ?? "", field.type),
        ]),
      );

      await runAction(dialogAction, payload);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "กรอกข้อมูลไม่ถูกต้อง",
      );
    }
  };

  return (
    <div className="space-y-6">
      {data.cards?.length ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.cards.map((card, index) => (
            <div
              key={`${card.label}-${index}`}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
              <p className="mt-2 text-2xl font-semibold">{card.value}</p>
            </div>
          ))}
        </section>
      ) : null}

      {data.charts?.length ? (
        <section className="grid gap-4 xl:grid-cols-2">
          {data.charts.map((chart) => (
            <ChartCard
              key={chart.key}
              title={chart.title}
              type={chart.type}
              data={chart.data}
            />
          ))}
        </section>
      ) : null}

      {data.insights?.length ? (
        <section className="grid gap-4 md:grid-cols-2">
          {data.insights.map((insight) => (
            <div
              key={insight.title}
              className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
            >
              <p className="text-sm">{insight.title}</p>
              <p className="mt-2 text-2xl font-semibold">{insight.value}</p>
            </div>
          ))}
        </section>
      ) : null}

      {data.reports ? (
        <section className="grid gap-4 xl:grid-cols-2">
          {Object.entries(data.reports).map(([key, value]) => (
            <div
              key={key}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
            >
              <h3 className="text-base font-semibold">{key}</h3>
              <div className="mt-4 space-y-3 text-sm">
                {Array.isArray(value) ? (
                  value.map((item, index) => (
                    <pre
                      key={index}
                      className="overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-900"
                    >
                      {JSON.stringify(item, null, 2)}
                    </pre>
                  ))
                ) : (
                  <pre className="overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-900">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {data.groups?.length ? (
        <section className="grid gap-4 xl:grid-cols-2">
          {data.groups.map((group) => (
            <div
              key={String(group.id)}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">{String(group.label ?? group.key)}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {String(group.description ?? "")}
                  </p>
                </div>
                {data.form ? (
                  <Button size="sm" variant="outline" onClick={() => openForm(group)}>
                    <Pencil className="mr-1 h-4 w-4" />
                    แก้ไข
                  </Button>
                ) : null}
              </div>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-900">
                {JSON.stringify(group.value ?? group, null, 2)}
              </pre>
            </div>
          ))}
        </section>
      ) : null}

      {data.item && data.form && !data.columns?.length ? (
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">ข้อมูลปัจจุบัน</p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-900">
                {JSON.stringify(data.item, null, 2)}
              </pre>
            </div>
            <Button onClick={() => openForm(data.item)}>
              <Pencil className="mr-2 h-4 w-4" />
              แก้ไขข้อมูล
            </Button>
          </div>
        </section>
      ) : null}

      {data.columns?.length ? (
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    defaultValue={searchParams.get("search") ?? ""}
                    placeholder="ค้นหา..."
                    className="w-[240px] pl-9"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        const target = event.currentTarget;
                        buildQuery({ search: target.value || null, page: "1" });
                      }
                    }}
                  />
                </div>

                {data.filters?.statusOptions?.length ? (
                  <select
                    className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                    defaultValue={searchParams.get("status") ?? ""}
                    onChange={(event) =>
                      buildQuery({ status: event.currentTarget.value || null, page: "1" })
                    }
                  >
                    <option value="">ทุกสถานะ</option>
                    {data.filters.statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : null}

                {data.filters?.categoryOptions?.length ? (
                  <select
                    className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                    defaultValue={searchParams.get("category") ?? ""}
                    onChange={(event) =>
                      buildQuery({ category: event.currentTarget.value || null, page: "1" })
                    }
                  >
                    <option value="">ทุกหมวดหมู่</option>
                    {data.filters.categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : null}

                {data.filters?.sortOptions?.length ? (
                  <select
                    className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                    defaultValue={searchParams.get("sort") ?? ""}
                    onChange={(event) =>
                      buildQuery({ sort: event.currentTarget.value || null, page: "1" })
                    }
                  >
                    <option value="">เรียงลำดับ</option>
                    {data.filters.sortOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : null}

                <Button variant="outline" size="sm" onClick={() => buildQuery({
                  search: null,
                  status: null,
                  category: null,
                  sort: null,
                  page: "1",
                })}>
                  <Filter className="mr-1 h-4 w-4" />
                  ล้างตัวกรอง
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {data.exportable?.length ? (
                  <Button size="sm" variant="outline" onClick={exportCsv}>
                    <Download className="mr-1 h-4 w-4" />
                    ส่งออก CSV
                  </Button>
                ) : null}

                {data.form ? (
                  <Button size="sm" onClick={() => openForm()}>
                    <Plus className="mr-1 h-4 w-4" />
                    เพิ่มข้อมูล
                  </Button>
                ) : null}
              </div>
            </div>

            {selectedIds.length && data.bulkActions?.length ? (
              <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-900">
                <span>เลือกแล้ว {selectedIds.length} รายการ</span>
                {data.bulkActions.map((action) => (
                  <Button
                    key={action.key}
                    size="sm"
                    variant={action.variant === "destructive" ? "destructive" : "outline"}
                    onClick={() =>
                      void runAction(action.key, { ids: selectedIds })
                    }
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>

          {items.length ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-900">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={
                            items.length > 0 && selectedIds.length === items.length
                          }
                          onChange={(event) =>
                            setSelectedIds(
                              event.currentTarget.checked
                                ? items
                                    .map((item) => String(item.id ?? ""))
                                    .filter(Boolean)
                                : [],
                            )
                          }
                        />
                      </th>
                      {data.columns.map((column) => (
                        <th
                          key={column.key}
                          className="px-4 py-3 text-left font-medium text-slate-500"
                        >
                          {column.label}
                        </th>
                      ))}
                      <th className="px-4 py-3 text-right font-medium text-slate-500">
                        การจัดการ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, rowIndex) => {
                      const itemId = String(item.id ?? rowIndex);
                      return (
                        <tr
                          key={itemId}
                          className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(itemId)}
                              onChange={(event) =>
                                setSelectedIds((current) =>
                                  event.currentTarget.checked
                                    ? [...current, itemId]
                                    : current.filter((value) => value !== itemId),
                                )
                              }
                            />
                          </td>
                          {data.columns.map((column) => {
                            const value = item[column.key];

                            return (
                              <td key={column.key} className="px-4 py-3 align-top">
                                {column.type === "badge" ? (
                                  <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                    {formatCellValue(value, column.type)}
                                  </span>
                                ) : column.type === "progress" ? (
                                  <div className="space-y-1">
                                    <Progress value={Number(value ?? 0)} className="h-2" />
                                    <p className="text-xs text-slate-500">
                                      {Number(value ?? 0)}%
                                    </p>
                                  </div>
                                ) : column.key === "actionPath" ? (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => item.actionPath && router.push(String(item.actionPath))}
                                  >
                                    <Eye className="mr-1 h-4 w-4" />
                                    เปิด
                                  </Button>
                                ) : (
                                  <span>{formatCellValue(value, column.type)}</span>
                                )}
                              </td>
                            );
                          })}
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap justify-end gap-2">
                              {data.rowActions?.map((action) => (
                                <Button
                                  key={action.key}
                                  size="sm"
                                  variant={
                                    action.variant === "destructive"
                                      ? "destructive"
                                      : action.key === "edit"
                                        ? "outline"
                                        : "secondary"
                                  }
                                  disabled={submitting}
                                  onClick={() => void handleRowAction(action.key, item)}
                                >
                                  {action.key === "edit" ? (
                                    <Pencil className="mr-1 h-4 w-4" />
                                  ) : action.key.includes("delete") ? (
                                    <Trash2 className="mr-1 h-4 w-4" />
                                  ) : null}
                                  {action.label}
                                </Button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {data.pagination ? (
                <div className="flex flex-wrap items-center justify-between border-t border-slate-200 px-4 py-3 text-sm dark:border-slate-800">
                  <p className="text-slate-500">
                    หน้า {data.pagination.page} จาก {data.pagination.totalPages} | ทั้งหมด{" "}
                    {data.pagination.total} รายการ
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={data.pagination.page <= 1}
                      onClick={() =>
                        buildQuery({
                          page: String(Math.max(1, data.pagination!.page - 1)),
                        })
                      }
                    >
                      ก่อนหน้า
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={data.pagination.page >= data.pagination.totalPages}
                      onClick={() =>
                        buildQuery({
                          page: String(data.pagination!.page + 1),
                        })
                      }
                    >
                      ถัดไป
                    </Button>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="px-4 py-12 text-center">
              <p className="text-lg font-semibold">
                {data.emptyState?.title ?? "ยังไม่มีข้อมูล"}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {data.emptyState?.description ?? "เมื่อมีข้อมูลแล้วจะแสดงที่นี่"}
              </p>
            </div>
          )}
        </section>
      ) : null}

      {data.recentActivity?.length ? (
        <section className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-base font-semibold">กิจกรรมล่าสุด</h3>
            <div className="mt-4 space-y-3">
              {data.recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-900"
                >
                  <p className="font-medium">{String(item.title ?? "")}</p>
                  <p className="mt-1 text-slate-500">{String(item.actor ?? "")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-base font-semibold">รายการล่าสุด</h3>
            <div className="mt-4 space-y-3">
              {(data.recentTransactions ?? []).map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-900"
                >
                  <p className="font-medium">{String(item.buyer ?? item.title ?? "")}</p>
                  <p className="mt-1 text-slate-500">
                    {item.amount ? formatCellValue(item.amount, "currency") : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {data.alerts?.length ? (
        <section className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-950 dark:border-red-900 dark:bg-red-950/30 dark:text-red-100">
          <h3 className="text-base font-semibold">สิ่งที่ต้องจัดการด่วน</h3>
          <div className="mt-4 space-y-2">
            {data.alerts.map((alert, index) => (
              <div key={index} className="rounded-lg bg-white/70 p-3 dark:bg-slate-950/50">
                {JSON.stringify(alert)}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dialogValues.id ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {data.form?.fields.map((field) => {
              if (field.type === "hidden") return null;

              const currentValue = dialogValues[field.key] ?? "";

              return (
                <div key={field.key} className="space-y-2">
                  <label className="text-sm font-medium">
                    {field.label}
                    {field.required ? " *" : ""}
                  </label>

                  {field.type === "textarea" || field.type === "json" ? (
                    <textarea
                      className="min-h-28 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                      value={String(currentValue)}
                      onChange={(event) =>
                        setDialogValues((current) => ({
                          ...current,
                          [field.key]: event.currentTarget.value,
                        }))
                      }
                    />
                  ) : field.type === "select" ? (
                    <select
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                      value={String(currentValue)}
                      onChange={(event) =>
                        setDialogValues((current) => ({
                          ...current,
                          [field.key]: event.currentTarget.value,
                        }))
                      }
                    >
                      <option value="">เลือกข้อมูล</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={Boolean(currentValue)}
                        onChange={(event) =>
                          setDialogValues((current) => ({
                            ...current,
                            [field.key]: event.currentTarget.checked,
                          }))
                        }
                      />
                      <span>เปิดใช้งาน</span>
                    </label>
                  ) : (
                    <Input
                      type={
                        field.type === "color"
                          ? "color"
                          : field.type === "number"
                            ? "number"
                            : field.type === "date"
                              ? "date"
                              : field.type === "password"
                                ? "password"
                                : field.type === "email"
                                  ? "email"
                                  : field.type === "url"
                                    ? "url"
                                    : "text"
                      }
                      value={String(currentValue)}
                      min={field.min}
                      max={field.max}
                      onChange={(event) =>
                        setDialogValues((current) => ({
                          ...current,
                          [field.key]:
                            field.type === "checkbox"
                              ? event.currentTarget.checked
                              : event.currentTarget.value,
                        }))
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              ยกเลิก
            </Button>
            <Button onClick={() => void handleSubmitDialog()} disabled={submitting}>
              {submitting ? "กำลังบันทึก..." : data.form?.submitLabel ?? "บันทึก"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

