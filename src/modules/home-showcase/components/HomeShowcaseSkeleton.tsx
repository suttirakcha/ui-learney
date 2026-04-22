"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function HomeShowcaseSkeleton() {
  return (
    <section className="section-frame py-16">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
          <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
