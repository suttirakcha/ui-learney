"use client";

import { ImagePlus, Loader2, Trash2, UploadCloud } from "lucide-react";
import { useId, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/lib/api/upload/upload.service";
import { cn } from "@/lib/utils";

type HomeShowcaseImageUploadProps = {
  label: string;
  value?: string | null;
  helperText?: string;
  onChange: (value: string | null) => void;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Upload failed";
}

export function HomeShowcaseImageUpload({
  label,
  value,
  helperText,
  onChange,
}: HomeShowcaseImageUploadProps) {
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("กรุณาเลือกไฟล์รูปภาพ");
      return;
    }

    setIsUploading(true);

    try {
      const url = await uploadImage(file);

      if (!url) {
        throw new Error("Upload returned an empty URL");
      }

      setPreviewFailed(false);
      onChange(url);
      toast.success("อัปโหลดรูปภาพเรียบร้อยแล้ว");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground">{label}</Label>

      <div className="rounded-[1.5rem] border border-white/60 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/6">
        <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
          <div className="overflow-hidden rounded-[1.25rem] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(250,243,255,0.92),rgba(237,248,255,0.94))] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(37,28,58,0.94),rgba(34,25,56,0.92),rgba(23,37,60,0.9))]">
            {value && !previewFailed ? (
              <>
                {/* User-provided preview URLs may come from hosts outside next/image allowlists. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={value}
                  alt={label}
                  className="h-full min-h-[160px] w-full object-cover"
                  onError={() => setPreviewFailed(true)}
                />
              </>
            ) : (
              <div className="flex min-h-[160px] flex-col items-center justify-center gap-3 p-6 text-center text-muted-foreground">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-primary dark:border-white/10 dark:bg-white/8">
                  <ImagePlus className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    ยังไม่มีรูปภาพ
                  </p>
                  <p className="text-xs leading-5">
                    อัปโหลดรูปใหม่หรือวาง URL โดยตรงได้
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <label
                htmlFor={inputId}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full",
                  isUploading
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer",
                )}
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <UploadCloud className="h-4 w-4" />
                )}
                {isUploading ? "กำลังอัปโหลด..." : "อัปโหลดรูปภาพ"}
              </label>

              <Button
                type="button"
                variant="ghost"
                className="rounded-full text-muted-foreground"
                disabled={!value}
                onClick={() => {
                  setPreviewFailed(false);
                  onChange(null);
                }}
              >
                <Trash2 className="h-4 w-4" />
                ล้างค่า
              </Button>
            </div>

            <input
              id={inputId}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => void handleUpload(event)}
            />

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                URL รูปภาพ
              </Label>
              <Input
                value={value ?? ""}
                onChange={(event) => {
                  setPreviewFailed(false);
                  onChange(event.currentTarget.value || null);
                }}
                placeholder="https://res.cloudinary.com/... หรือ /path"
              />
            </div>

            {helperText ? (
              <p className="text-xs leading-5 text-muted-foreground">
                {helperText}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
