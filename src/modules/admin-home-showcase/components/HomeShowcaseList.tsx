"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  CalendarRange,
  Eye,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdminHomeShowcase } from "../hooks/useAdminHomeShowcase";
import {
  createEmptyHomeShowcaseFormValue,
  HomeShowcaseForm,
  mapHomeShowcaseToFormValue,
} from "./HomeShowcaseForm";
import { HomeShowcasePreview } from "./HomeShowcasePreview";
import type {
  HomeShowcase,
  HomeShowcaseMutationInput,
} from "@/modules/home-showcase/types/home-showcase.type";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong";
}

function formatDateTime(value?: string | null) {
  if (!value) {
    return "ไม่กำหนด";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "ไม่ถูกต้อง";
  }

  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getScheduleLabel(item: HomeShowcase) {
  if (!item.startsAt && !item.endsAt) {
    return "แสดงได้ตลอดเวลา";
  }

  return `${formatDateTime(item.startsAt)} - ${formatDateTime(item.endsAt)}`;
}

function isCurrentlyLive(item: HomeShowcase) {
  const now = new Date();
  const startsAt = item.startsAt ? new Date(item.startsAt) : null;
  const endsAt = item.endsAt ? new Date(item.endsAt) : null;

  if (!item.isActive) {
    return false;
  }

  if (startsAt && startsAt > now) {
    return false;
  }

  if (endsAt && endsAt < now) {
    return false;
  }

  return true;
}

function HomeShowcaseManager() {
  const { showcasesQuery, saveMutation, deleteMutation, toggleMutation } =
    useAdminHomeShowcase();
  const showcases = useMemo(
    () => showcasesQuery.data ?? [],
    [showcasesQuery.data],
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<HomeShowcaseMutationInput>(
    createEmptyHomeShowcaseFormValue(),
  );

  const selectedItem = useMemo(
    () => showcases.find((item) => item.id === selectedId) ?? null,
    [showcases, selectedId],
  );

  useEffect(() => {
    setDraft(mapHomeShowcaseToFormValue(selectedItem));
  }, [selectedItem]);

  const resetDraft = () => {
    setSelectedId(null);
    setDraft(createEmptyHomeShowcaseFormValue());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const saved = await saveMutation.mutateAsync({
        id: selectedItem?.id,
        payload: draft,
      });

      toast.success(
        selectedItem ? "อัปเดต Home Showcase แล้ว" : "สร้าง Home Showcase แล้ว",
      );
      setSelectedId(saved.id);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (item: HomeShowcase) => {
    const confirmed = window.confirm(
      `ต้องการลบ showcase "${item.title}" ใช่หรือไม่`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(item.id);
      toast.success("ลบ Home Showcase เรียบร้อยแล้ว");

      if (selectedId === item.id) {
        resetDraft();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleToggle = async (item: HomeShowcase) => {
    try {
      const updated = await toggleMutation.mutateAsync(item.id);
      toast.success(
        updated.isActive
          ? "เปิดใช้งาน Showcase แล้ว"
          : "ปิดใช้งาน Showcase แล้ว",
      );
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const isSaving = saveMutation.isPending;
  const isMutating = deleteMutation.isPending || toggleMutation.isPending;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/60 bg-white/76 p-6 shadow-[0_24px_70px_rgba(155,118,190,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Home Showcase
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-foreground">
              จัดการ Hero Showcase ของหน้า Home
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              Public page จะดึงข้อมูลจาก `GET /home/showcase/active` และใช้ค่า
              stats จริงจาก `/experience/home` โดยอัตโนมัติ ถ้าไม่มี active
              showcase ระบบจะ fallback เป็นกล่อง gradient ที่ปลอดภัยแทน
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => void showcasesQuery.refetch()}
            >
              <RefreshCw className="h-4 w-4" />
              รีเฟรชรายการ
            </Button>
            <Button type="button" onClick={resetDraft}>
              <Plus className="h-4 w-4" />
              สร้าง Showcase ใหม่
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.12fr)_460px]">
        <HomeShowcasePreview value={draft} />

        <HomeShowcaseForm
          value={draft}
          mode={selectedItem ? "edit" : "create"}
          isSubmitting={isSaving}
          onSubmit={handleSubmit}
          onChange={setDraft}
          onCancel={resetDraft}
        />
      </div>

      <section className="space-y-4 rounded-[2rem] border border-white/60 bg-white/76 p-6 shadow-[0_24px_70px_rgba(155,118,190,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Existing showcase items
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              รายการด้านล่างจะเรียงตาม active, sort order และเวลาแก้ไขล่าสุด
            </p>
          </div>
          {isMutating ? (
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              กำลังอัปเดตรายการ...
            </div>
          ) : null}
        </div>

        {showcasesQuery.isLoading ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`showcase-skeleton-${index}`}
                className="min-h-[220px] animate-pulse rounded-[1.75rem] border border-white/60 bg-white/60 p-5 dark:border-white/10 dark:bg-white/6"
              />
            ))}
          </div>
        ) : showcasesQuery.isError ? (
          <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50/90 p-6 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
            <p className="text-lg font-semibold">
              โหลดรายการ Home Showcase ไม่สำเร็จ
            </p>
            <p className="mt-2 text-sm leading-6">
              {getErrorMessage(showcasesQuery.error)}
            </p>
            <Button
              type="button"
              className="mt-4"
              variant="outline"
              onClick={() => void showcasesQuery.refetch()}
            >
              ลองใหม่
            </Button>
          </div>
        ) : showcases.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-white/70 bg-white/55 p-8 text-center dark:border-white/10 dark:bg-white/4">
            <p className="text-lg font-semibold text-foreground">
              ยังไม่มี Home Showcase
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              สร้างรายการแรกเพื่อให้หน้า Home สามารถดึงรูป campaign จาก backend
              ได้ทันที
            </p>
            <Button type="button" className="mt-5" onClick={resetDraft}>
              สร้างรายการแรก
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {showcases.map((item) => {
              const isSelected = item.id === selectedId;
              const isLive = isCurrentlyLive(item);

              return (
                <article
                  key={item.id}
                  className={cn(
                    "rounded-[1.75rem] border border-white/60 bg-white/68 p-5 shadow-sm transition-all dark:border-white/10 dark:bg-white/5",
                    isSelected
                      ? "border-primary/40 shadow-[0_20px_50px_rgba(255,111,174,0.15)]"
                      : "hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(161,121,205,0.1)]",
                  )}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            sort {item.sortOrder}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-medium",
                              item.isActive
                                ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300"
                                : "bg-slate-500/12 text-slate-600 dark:text-slate-300",
                            )}
                          >
                            {item.isActive ? "active" : "inactive"}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-xs font-medium",
                              isLive
                                ? "bg-sky-500/12 text-sky-600 dark:text-sky-300"
                                : "bg-amber-500/12 text-amber-700 dark:text-amber-300",
                            )}
                          >
                            {isLive ? "live now" : "scheduled / hidden"}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold leading-tight text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {item.subtitle || "ไม่มี subtitle"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedId(item.id)}
                        >
                          <Pencil className="h-4 w-4" />
                          แก้ไข
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => void handleToggle(item)}
                        >
                          <Eye className="h-4 w-4" />
                          {item.isActive ? "ปิดใช้งาน" : "เปิดใช้งาน"}
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => void handleDelete(item)}
                        >
                          <Trash2 className="h-4 w-4" />
                          ลบ
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.25rem] border border-white/60 bg-white/72 p-4 dark:border-white/10 dark:bg-white/6">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <CalendarRange className="h-4 w-4 text-primary" />
                          Display window
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {getScheduleLabel(item)}
                        </p>
                      </div>

                      <div className="rounded-[1.25rem] border border-white/60 bg-white/72 p-4 dark:border-white/10 dark:bg-white/6">
                        <p className="text-sm font-medium text-foreground">
                          Layout
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          text {item.textAlign}, media {item.mediaPosition},
                          overlay {item.overlayOpacity.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {item.badge ? (
                        <span className="rounded-full border border-white/60 bg-white/72 px-3 py-1 dark:border-white/10 dark:bg-white/6">
                          badge: {item.badge}
                        </span>
                      ) : null}
                      {item.primaryText && item.primaryHref ? (
                        <span className="rounded-full border border-white/60 bg-white/72 px-3 py-1 dark:border-white/10 dark:bg-white/6">
                          primary CTA: {item.primaryText}
                        </span>
                      ) : null}
                      {item.secondaryText && item.secondaryHref ? (
                        <span className="rounded-full border border-white/60 bg-white/72 px-3 py-1 dark:border-white/10 dark:bg-white/6">
                          secondary CTA: {item.secondaryText}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export function HomeShowcaseList() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 30,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HomeShowcaseManager />
    </QueryClientProvider>
  );
}
