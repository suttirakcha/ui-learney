"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeShowcase } from "@/modules/home-showcase/components/HomeShowcase";
import type {
  HomeShowcase as HomeShowcaseRecord,
  HomeShowcaseMutationInput,
} from "@/modules/home-showcase/types/home-showcase.type";

type HomeShowcasePreviewProps = {
  value: HomeShowcaseMutationInput;
};

const previewAlignClassName = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
} as const;

function buildPreviewBanner(
  value: HomeShowcaseMutationInput,
): HomeShowcaseRecord | null {
  if (!value.desktopImageUrl.trim()) {
    return null;
  }

  const now = new Date().toISOString();

  return {
    id: "preview",
    title: value.title || "Preview title",
    subtitle: value.subtitle ?? null,
    badge: value.badge ?? null,
    description: value.description ?? null,
    desktopImageUrl: value.desktopImageUrl,
    mobileImageUrl: value.mobileImageUrl ?? null,
    primaryText: value.primaryText ?? null,
    primaryHref: value.primaryHref ?? null,
    secondaryText: value.secondaryText ?? null,
    secondaryHref: value.secondaryHref ?? null,
    overlayOpacity: value.overlayOpacity,
    textAlign: value.textAlign,
    mediaPosition: value.mediaPosition,
    enableAnimation: value.enableAnimation,
    enableFloating: value.enableFloating,
    sortOrder: value.sortOrder,
    isActive: value.isActive,
    startsAt: value.startsAt ?? null,
    endsAt: value.endsAt ?? null,
    createdAt: now,
    updatedAt: now,
  };
}

export function HomeShowcasePreview({ value }: HomeShowcasePreviewProps) {
  const previewBanner = buildPreviewBanner(value);
  const alignClassName = previewAlignClassName[value.textAlign];
  const previewState = previewBanner ? "ready" : "empty";

  return (
    <section className="space-y-4 rounded-[2rem] border border-white/60 bg-white/72 p-6 shadow-[0_24px_70px_rgba(155,118,190,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Live Preview
        </p>
        <h2 className="text-2xl font-semibold text-foreground">
          ตัวอย่าง Hero บนหน้า Home
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Preview นี้ใช้ข้อความและรูปจาก draft ปัจจุบัน ส่วน stats card ด้านล่างในหน้า
          Home จะยังดึงค่าจริงจาก endpoint เดิม `/experience/home`
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(252,244,255,0.9),rgba(239,247,255,0.94))] p-4 shadow-sm dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(34,26,54,0.92),rgba(34,25,56,0.94),rgba(22,37,61,0.9))]">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] xl:items-center">
          <div
            className={cn(
              "flex flex-col gap-5 p-3",
              alignClassName,
              value.mediaPosition === "left" ? "xl:order-2" : "",
            )}
          >
            <Badge className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-foreground/75 shadow-sm dark:border-white/10 dark:bg-white/10">
              {value.badge?.trim() || "แพลตฟอร์มการเรียนรู้แห่งอนาคต"}
            </Badge>

            <div className="space-y-3">
              <h3 className="max-w-2xl whitespace-pre-line text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground">
                {value.title.trim() || "พัฒนาทักษะ\nสำหรับยุค AI"}
              </h3>
              <p className="max-w-xl text-sm leading-7 text-foreground/72 sm:text-base">
                {value.subtitle?.trim() ||
                  "ข้อความรองของ showcase จะขึ้นตรงนี้ และบนหน้า Home จริงจะยังคงใช้ real stats จาก backend เดิม"}
              </p>
            </div>

            <div
              className={cn(
                "flex flex-col gap-3 sm:flex-row sm:flex-wrap",
                value.textAlign === "center"
                  ? "sm:justify-center"
                  : value.textAlign === "right"
                    ? "sm:justify-end"
                    : "sm:justify-start",
              )}
            >
              {value.primaryText?.trim() && value.primaryHref?.trim() ? (
                <Button type="button" size="lg" className="h-11 rounded-full px-5">
                  {value.primaryText}
                </Button>
              ) : null}
              {value.secondaryText?.trim() && value.secondaryHref?.trim() ? (
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full px-5 border-white/70 bg-white/65 dark:border-white/10 dark:bg-white/8"
                >
                  {value.secondaryText}
                </Button>
              ) : null}
            </div>
          </div>

          <div className={cn("relative", value.mediaPosition === "left" ? "xl:order-1" : "")}>
            <HomeShowcase banner={previewBanner} state={previewState} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            "คอร์สเรียน: ใช้ข้อมูลจริง",
            "ผู้เรียน: ใช้ข้อมูลจริง",
            "ผู้สอนมืออาชีพ: ใช้ข้อมูลจริง",
            "ความพึงพอใจ: ใช้ข้อมูลจริง",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.25rem] border border-white/60 bg-white/70 px-4 py-3 text-sm text-foreground/75 dark:border-white/10 dark:bg-white/6"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
