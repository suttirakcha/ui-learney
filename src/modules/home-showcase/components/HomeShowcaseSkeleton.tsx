"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function HomeShowcaseSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/55 p-4 shadow-[0_24px_70px_rgba(168,130,198,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5",
        className,
      )}
    >
      <div className="space-y-4 rounded-[1.75rem] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(247,239,255,0.8),rgba(236,247,255,0.9))] p-4 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(39,28,60,0.8),rgba(35,27,58,0.86),rgba(24,39,63,0.82))]">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
        <Skeleton className="aspect-[4/3] w-full rounded-[1.5rem]" />
        <div className="grid gap-3 sm:grid-cols-3">
          <Skeleton className="h-20 rounded-[1.25rem]" />
          <Skeleton className="h-20 rounded-[1.25rem]" />
          <Skeleton className="h-20 rounded-[1.25rem]" />
        </div>
      </div>
    </div>
  );
}
