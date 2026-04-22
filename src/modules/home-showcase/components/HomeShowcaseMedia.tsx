"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { HomeShowcase } from "../types/home-showcase.type";

interface HomeShowcaseMediaProps {
  banner: HomeShowcase;
  className?: string;
}

const NEXT_IMAGE_HOSTS = new Set([
  "res.cloudinary.com",
  "images.unsplash.com",
  "placehold.co",
]);

function canUseNextImage(src: string) {
  if (!src) return false;
  if (src.startsWith("/") || src.startsWith("data:")) return true;

  try {
    const parsed = new URL(src);
    return NEXT_IMAGE_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
}

function ShowcaseImage({
  src,
  alt,
  sizes,
  className,
  onError,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  onError: () => void;
}) {
  if (canUseNextImage(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", className)}
        sizes={sizes}
        priority
        onError={onError}
      />
    );
  }

  return (
    <>
      {/* Some showcase images can come from backend-controlled hosts outside next/image config. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
        onError={onError}
      />
    </>
  );
}

function ShowcaseMediaFallback({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[320px] w-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/60 bg-[radial-gradient(circle_at_top_right,rgba(255,188,220,0.75),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(180,203,255,0.65),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.94),rgba(250,240,255,0.92),rgba(238,248,255,0.96))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/10 dark:bg-[radial-gradient(circle_at_top_right,rgba(255,143,188,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(122,191,255,0.2),transparent_32%),linear-gradient(135deg,rgba(31,24,48,0.92),rgba(34,25,56,0.94),rgba(24,37,60,0.92))]",
        className,
      )}
    >
      <div className="absolute left-5 top-5 h-20 w-20 rounded-full bg-white/40 blur-2xl dark:bg-white/10" />
      <div className="absolute bottom-4 right-4 h-32 w-32 rounded-full bg-pink-200/50 blur-3xl dark:bg-pink-400/10" />
      <div className="relative flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/75 text-lg font-semibold text-rose-500 shadow-sm dark:border-white/10 dark:bg-white/10">
          L
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Learney Showcase
          </p>
          <p className="text-base font-semibold text-foreground">
            Premium learning, softly framed
          </p>
        </div>
      </div>

      <div className="relative mt-8 grid gap-3">
        <div className="rounded-[1.5rem] border border-white/70 bg-white/75 p-4 shadow-sm dark:border-white/10 dark:bg-white/8">
          <p className="text-sm text-muted-foreground">Featured visual</p>
          <p className="mt-2 text-xl font-semibold text-foreground">
            {title || "Your next AI skill journey"}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.25rem] border border-white/60 bg-white/60 p-4 dark:border-white/10 dark:bg-white/6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Soft glass
            </p>
            <p className="mt-2 text-sm text-foreground/80">
              Fallback box stays polished even when no active showcase exists.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-white/60 bg-white/60 p-4 dark:border-white/10 dark:bg-white/6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Safe state
            </p>
            <p className="mt-2 text-sm text-foreground/80">
              Image failures gracefully switch to a premium gradient panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeShowcaseMedia({
  banner,
  className = "",
}: HomeShowcaseMediaProps) {
  const [desktopFailed, setDesktopFailed] = useState(false);
  const [mobileFailed, setMobileFailed] = useState(false);
  const mobileImageUrl = useMemo(
    () => banner.mobileImageUrl ?? banner.desktopImageUrl,
    [banner.desktopImageUrl, banner.mobileImageUrl],
  );
  const desktopImageUrl = desktopFailed ? "" : banner.desktopImageUrl;
  const mobileSource = mobileFailed ? desktopImageUrl : mobileImageUrl;
  const hasDesktopImage = Boolean(desktopImageUrl);
  const hasMobileImage = Boolean(mobileSource);

  if (!hasDesktopImage && !hasMobileImage) {
    return <ShowcaseMediaFallback title={banner.title} className={className} />;
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/60 shadow-[0_24px_60px_rgba(161,121,205,0.18)] lg:hidden dark:border-white/10 dark:bg-white/5">
        {hasMobileImage ? (
          <>
            <div
              className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(20,18,41,0.04),rgba(20,18,41,0.22))]"
              style={{ opacity: banner.overlayOpacity }}
            />
            <ShowcaseImage
              src={mobileSource}
              alt={`${banner.title} mobile`}
              sizes="100vw"
              onError={() => setMobileFailed(true)}
            />
          </>
        ) : (
          <ShowcaseMediaFallback title={banner.title} />
        )}
      </div>

      <div className="relative hidden min-h-[420px] overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/60 shadow-[0_28px_80px_rgba(161,121,205,0.18)] lg:block dark:border-white/10 dark:bg-white/5">
        {hasDesktopImage ? (
          <>
            <div
              className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(20,18,41,0.02),rgba(20,18,41,0.18))]"
              style={{ opacity: banner.overlayOpacity }}
            />
            <ShowcaseImage
              src={desktopImageUrl}
              alt={banner.title}
              sizes="(max-width: 1280px) 48vw, 42vw"
              onError={() => setDesktopFailed(true)}
            />
          </>
        ) : (
          <ShowcaseMediaFallback title={banner.title} />
        )}
      </div>
    </div>
  );
}
