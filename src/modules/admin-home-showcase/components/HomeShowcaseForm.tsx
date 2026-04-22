"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HomeShowcaseImageUpload } from "./HomeShowcaseImageUpload";
import type {
  HomeShowcase,
  HomeShowcaseMutationInput,
} from "@/modules/home-showcase/types/home-showcase.type";

function toDateTimeLocalValue(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - timezoneOffset * 60_000);

  return localDate.toISOString().slice(0, 16);
}

export function createEmptyHomeShowcaseFormValue(): HomeShowcaseMutationInput {
  return {
    title: "",
    subtitle: "",
    badge: "",
    description: "",
    desktopImageUrl: "",
    mobileImageUrl: "",
    primaryText: "",
    primaryHref: "",
    secondaryText: "",
    secondaryHref: "",
    overlayOpacity: 0.18,
    textAlign: "left",
    mediaPosition: "right",
    enableAnimation: true,
    enableFloating: false,
    sortOrder: 0,
    isActive: true,
    startsAt: "",
    endsAt: "",
  };
}

export function mapHomeShowcaseToFormValue(
  item?: HomeShowcase | null,
): HomeShowcaseMutationInput {
  if (!item) {
    return createEmptyHomeShowcaseFormValue();
  }

  return {
    title: item.title,
    subtitle: item.subtitle ?? "",
    badge: item.badge ?? "",
    description: item.description ?? "",
    desktopImageUrl: item.desktopImageUrl,
    mobileImageUrl: item.mobileImageUrl ?? "",
    primaryText: item.primaryText ?? "",
    primaryHref: item.primaryHref ?? "",
    secondaryText: item.secondaryText ?? "",
    secondaryHref: item.secondaryHref ?? "",
    overlayOpacity: item.overlayOpacity,
    textAlign: item.textAlign,
    mediaPosition: item.mediaPosition,
    enableAnimation: item.enableAnimation,
    enableFloating: item.enableFloating,
    sortOrder: item.sortOrder,
    isActive: item.isActive,
    startsAt: toDateTimeLocalValue(item.startsAt),
    endsAt: toDateTimeLocalValue(item.endsAt),
  };
}

type HomeShowcaseFormProps = {
  value: HomeShowcaseMutationInput;
  mode: "create" | "edit";
  isSubmitting: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (value: HomeShowcaseMutationInput) => void;
  onCancel?: () => void;
};

const booleanFields: Array<{
  key: "enableAnimation" | "enableFloating" | "isActive";
  label: string;
  description: string;
}> = [
  {
    key: "enableAnimation",
    label: "Enable animation",
    description: "เปิด transition และ motion เบา ๆ ในฝั่ง public",
  },
  {
    key: "enableFloating",
    label: "Enable floating",
    description: "แสดง floating accents ด้านหลัง media",
  },
  {
    key: "isActive",
    label: "Active",
    description: "ถ้า active และอยู่ในช่วงเวลา ระบบจะใช้กับหน้า Home",
  },
];

export function HomeShowcaseForm({
  value,
  mode,
  isSubmitting,
  onSubmit,
  onChange,
  onCancel,
}: HomeShowcaseFormProps) {
  const update = <Key extends keyof HomeShowcaseMutationInput>(
    key: Key,
    nextValue: HomeShowcaseMutationInput[Key],
  ) => {
    onChange({
      ...value,
      [key]: nextValue,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-[2rem] border border-white/60 bg-white/78 p-6 shadow-[0_24px_70px_rgba(155,118,190,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6"
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {mode === "edit" ? "Edit showcase" : "Create showcase"}
        </p>
        <h2 className="text-2xl font-semibold text-foreground">
          {mode === "edit"
            ? "แก้ไข Home Showcase"
            : "สร้าง Home Showcase ใหม่"}
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Hero ฝั่ง public จะใช้ข้อความและรูปจากรายการ active พร้อมดึง stats
          จริงจาก backend เดิม
        </p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="home-showcase-title">Title</Label>
          <Textarea
            id="home-showcase-title"
            value={value.title}
            onChange={(event) => update("title", event.currentTarget.value)}
            placeholder="พัฒนาทักษะ\nสำหรับยุค AI"
            className="min-h-24"
            required
          />
          <p className="text-xs text-muted-foreground">
            รองรับหลายบรรทัดได้ ถ้าต้องการจัด headline เป็น 2 บรรทัด
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="home-showcase-subtitle">Subtitle</Label>
          <Textarea
            id="home-showcase-subtitle"
            value={value.subtitle ?? ""}
            onChange={(event) => update("subtitle", event.currentTarget.value)}
            placeholder="เรียนรู้จากคอร์สคุณภาพ พร้อม AI ที่ช่วยแนะนำเส้นทางที่เหมาะกับคุณ"
            className="min-h-24"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="home-showcase-badge">Badge</Label>
            <Input
              id="home-showcase-badge"
              value={value.badge ?? ""}
              onChange={(event) => update("badge", event.currentTarget.value)}
              placeholder="แพลตฟอร์มการเรียนรู้แห่งอนาคต"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="home-showcase-sort-order">Sort order</Label>
            <Input
              id="home-showcase-sort-order"
              type="number"
              min={0}
              value={value.sortOrder}
              onChange={(event) =>
                update("sortOrder", Number(event.currentTarget.value || 0))
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="home-showcase-description">Description</Label>
          <Textarea
            id="home-showcase-description"
            value={value.description ?? ""}
            onChange={(event) =>
              update("description", event.currentTarget.value)
            }
            placeholder="ข้อความรองสำหรับใช้ในอนาคตหรือ campaign note"
            className="min-h-20"
          />
        </div>

        <HomeShowcaseImageUpload
          label="Desktop image"
          value={value.desktopImageUrl}
          onChange={(nextValue) => update("desktopImageUrl", nextValue ?? "")}
          helperText="ควรใช้ภาพแนวนอนหรือสัดส่วน 4:3 เพื่อให้แสดงผลสวยในกล่อง showcase"
        />

        <HomeShowcaseImageUpload
          label="Mobile image"
          value={value.mobileImageUrl}
          onChange={(nextValue) => update("mobileImageUrl", nextValue)}
          helperText="ถ้าเว้นว่าง ระบบจะใช้รูป desktop แทนโดยอัตโนมัติ"
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4 rounded-[1.5rem] border border-white/60 bg-white/65 p-4 dark:border-white/10 dark:bg-white/6">
            <div className="space-y-2">
              <Label htmlFor="home-showcase-primary-text">Primary button text</Label>
              <Input
                id="home-showcase-primary-text"
                value={value.primaryText ?? ""}
                onChange={(event) =>
                  update("primaryText", event.currentTarget.value)
                }
                placeholder="เริ่มเรียนเลย"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="home-showcase-primary-href">Primary button href</Label>
              <Input
                id="home-showcase-primary-href"
                value={value.primaryHref ?? ""}
                onChange={(event) =>
                  update("primaryHref", event.currentTarget.value)
                }
                placeholder="/courses"
              />
            </div>
          </div>

          <div className="space-y-4 rounded-[1.5rem] border border-white/60 bg-white/65 p-4 dark:border-white/10 dark:bg-white/6">
            <div className="space-y-2">
              <Label htmlFor="home-showcase-secondary-text">
                Secondary button text
              </Label>
              <Input
                id="home-showcase-secondary-text"
                value={value.secondaryText ?? ""}
                onChange={(event) =>
                  update("secondaryText", event.currentTarget.value)
                }
                placeholder="ค้นหาอาชีพที่เหมาะกับคุณ"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="home-showcase-secondary-href">
                Secondary button href
              </Label>
              <Input
                id="home-showcase-secondary-href"
                value={value.secondaryHref ?? ""}
                onChange={(event) =>
                  update("secondaryHref", event.currentTarget.value)
                }
                placeholder="/career-assessment"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Text alignment</Label>
            <Select
              value={value.textAlign}
              onValueChange={(nextValue) =>
                update("textAlign", nextValue as HomeShowcaseMutationInput["textAlign"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select alignment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Media position</Label>
            <Select
              value={value.mediaPosition}
              onValueChange={(nextValue) =>
                update(
                  "mediaPosition",
                  nextValue as HomeShowcaseMutationInput["mediaPosition"],
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select media position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="left">Left</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="home-showcase-overlay">Overlay opacity</Label>
            <span className="text-sm font-medium text-foreground">
              {value.overlayOpacity.toFixed(2)}
            </span>
          </div>
          <input
            id="home-showcase-overlay"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={value.overlayOpacity}
            onChange={(event) =>
              update("overlayOpacity", Number(event.currentTarget.value))
            }
            className="w-full accent-primary"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="home-showcase-starts-at">Start datetime</Label>
            <Input
              id="home-showcase-starts-at"
              type="datetime-local"
              value={value.startsAt ?? ""}
              onChange={(event) => update("startsAt", event.currentTarget.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="home-showcase-ends-at">End datetime</Label>
            <Input
              id="home-showcase-ends-at"
              type="datetime-local"
              value={value.endsAt ?? ""}
              onChange={(event) => update("endsAt", event.currentTarget.value)}
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {booleanFields.map((item) => {
            const checked = value[item.key];

            return (
              <label
                key={item.key}
                className="flex cursor-pointer items-start gap-3 rounded-[1.5rem] border border-white/60 bg-white/65 p-4 shadow-sm transition hover:border-primary/30 dark:border-white/10 dark:bg-white/6"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => update(item.key, event.currentTarget.checked)}
                  className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-white/50 pt-4 dark:border-white/10">
        {mode === "edit" ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            ยกเลิกการแก้ไข
          </Button>
        ) : null}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "กำลังบันทึก..."
            : mode === "edit"
              ? "บันทึกการแก้ไข"
              : "สร้าง Showcase"}
        </Button>
      </div>
    </form>
  );
}
