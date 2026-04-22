"use client";

import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useHomeShowcase } from "../hooks/useHomeShowcase";
import { HomeShowcaseSkeleton } from "./HomeShowcaseSkeleton";
import { HomeShowcaseMedia } from "./HomeShowcaseMedia";
import { HomeShowcaseFloatingCards } from "./HomeShowcaseFloatingCards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HomeShowcase() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HomeShowcaseContent />
    </QueryClientProvider>
  );
}

function HomeShowcaseContent() {
  const { data: banner, isLoading, error } = useHomeShowcase();

  if (error || !banner) return null;
  if (isLoading) return <HomeShowcaseSkeleton />;

  const isLeftMedia = banner.mediaPosition === "left";

  return (
    <section className="section-frame py-16">
      <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 p-8 md:p-12 backdrop-blur-xl shadow-2xl transition-all duration-1000 hover:shadow-3xl">
        {banner.enableFloating && <HomeShowcaseFloatingCards />}

        <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <div
            className={`space-y-6 ${isLeftMedia ? "order-2 lg:order-1" : ""}`}
          >
            {banner.badge && (
              <Badge
                variant="secondary"
                className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm border-white/30"
              >
                {banner.badge}
              </Badge>
            )}

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white to-primary bg-clip-text text-transparent drop-shadow-lg">
              {banner.title}
            </h2>

            {banner.subtitle && (
              <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-lg">
                {banner.subtitle}
              </p>
            )}

            {banner.description && (
              <p className="text-lg text-foreground/80 max-w-md">
                {banner.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {banner.primaryText && banner.primaryHref && (
                <Link href={banner.primaryHref}>
                  <Button
                    size="lg"
                    className="group text-lg px-8 font-semibold shadow-xl hover:shadow-2xl"
                  >
                    {banner.primaryText}
                  </Button>
                </Link>
              )}
              {banner.secondaryText && banner.secondaryHref && (
                <Link href={banner.secondaryHref}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 border-white/50 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    {banner.secondaryText}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Media */}
          <div
            className={`relative ${isLeftMedia ? "order-1 lg:order-2" : ""}`}
          >
            <HomeShowcaseMedia banner={banner} />
          </div>
        </div>
      </div>
    </section>
  );
}
