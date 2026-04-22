"use client";

import { AlertCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { HomeShowcase as HomeShowcaseBanner } from "../types/home-showcase.type";
import { HomeShowcaseSkeleton } from "./HomeShowcaseSkeleton";
import { HomeShowcaseMedia } from "./HomeShowcaseMedia";
import { HomeShowcaseFloatingCards } from "./HomeShowcaseFloatingCards";

type HomeShowcaseState = "loading" | "ready" | "empty" | "error";

interface HomeShowcaseProps {
  banner?: HomeShowcaseBanner | null;
  state?: HomeShowcaseState;
  className?: string;
}

function HomeShowcaseFallback({
  state,
  title,
}: {
  state: Exclude<HomeShowcaseState, "ready" | "loading">;
  title?: string;
}) {
  const isError = state === "error";

  return (
    <div className="relative flex min-h-[320px] flex-col justify-between rounded-[1.75rem] border border-white/60 bg-[radial-gradient(circle_at_top_right,rgba(255,198,223,0.55),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(169,208,255,0.55),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.92),rgba(249,242,255,0.9),rgba(236,248,255,0.94))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/10 dark:bg-[radial-gradient(circle_at_top_right,rgba(255,143,188,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(122,191,255,0.16),transparent_30%),linear-gradient(135deg,rgba(33,25,52,0.92),rgba(34,25,56,0.94),rgba(22,37,61,0.9))]">
      <div className="absolute left-6 top-5 h-24 w-24 rounded-full bg-white/45 blur-3xl dark:bg-white/8" />
      <div className="absolute bottom-5 right-5 h-24 w-24 rounded-full bg-pink-200/60 blur-3xl dark:bg-pink-400/10" />
      <div className="relative flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-rose-500 shadow-sm dark:border-white/10 dark:bg-white/10">
          {isError ? <AlertCircle className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {isError ? "Showcase error" : "Showcase standby"}
          </p>
          <p className="text-base font-semibold text-foreground">
            {title || "Learney premium showcase"}
          </p>
        </div>
      </div>

      <div className="relative mt-8 space-y-3">
        <Badge
          variant="secondary"
          className="inline-flex rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[0.7rem] font-medium tracking-[0.16em] text-foreground/80 uppercase dark:border-white/10 dark:bg-white/10"
        >
          {isError ? "Temporarily unavailable" : "No active showcase"}
        </Badge>
        <p className="max-w-md text-sm leading-7 text-foreground/75">
          {isError
            ? "The media panel could not be loaded right now, so the Home page falls back to a safe premium gradient instead of breaking."
            : "Activate a showcase from the admin panel to replace this fallback box with a live promotional image and CTA content."}
        </p>
      </div>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
        {[
          "Pastel gradient",
          "Glass surface",
          isError ? "Error-safe fallback" : "Ready for activation",
        ].map((item) => (
          <div
            key={item}
            className="rounded-[1.25rem] border border-white/65 bg-white/75 px-4 py-3 text-sm text-foreground/75 shadow-sm dark:border-white/10 dark:bg-white/6"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeShowcase({
  banner,
  state = banner ? "ready" : "empty",
  className,
}: HomeShowcaseProps) {
  if (state === "loading") {
    return <HomeShowcaseSkeleton className={className} />;
  }

  const readyBanner = state === "ready" ? banner ?? null : null;

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-[2rem] border border-white/60 bg-white/50 p-4 shadow-[0_30px_80px_rgba(155,118,190,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,180,214,0.45),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(158,208,255,0.4),transparent_32%)]" />
      {readyBanner?.enableFloating ? <HomeShowcaseFloatingCards /> : null}
      <div
        className={cn(
          "relative",
          readyBanner?.enableAnimation
            ? "transition duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.01]"
            : "",
        )}
      >
        {readyBanner ? (
          <HomeShowcaseMedia banner={readyBanner} />
        ) : (
          <HomeShowcaseFallback
            state={state === "error" ? "error" : "empty"}
            title={banner?.title}
          />
        )}
      </div>
    </div>
  );
}
