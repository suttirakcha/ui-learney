"use client";

import Image from "next/image";
import type { HomeShowcase } from "../types/home-showcase.type";

interface HomeShowcaseMediaProps {
  banner: HomeShowcase;
  className?: string;
}

export function HomeShowcaseMedia({
  banner,
  className = "",
}: HomeShowcaseMediaProps) {
  const mobileImageUrl = banner.mobileImageUrl ?? banner.desktopImageUrl;

  return (
    <div className={`relative ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:hidden">
        <div
          className="absolute inset-0 z-10 bg-black/10"
          style={{ opacity: banner.overlayOpacity }}
        />
        <Image
          src={mobileImageUrl}
          alt={`${banner.title} mobile`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative hidden min-h-[360px] overflow-hidden rounded-2xl lg:block">
        <div
          className="absolute inset-0 z-10 bg-black/10"
          style={{ opacity: banner.overlayOpacity }}
        />
        <Image
          src={banner.desktopImageUrl}
          alt={banner.title}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 50vw, 40vw"
          priority
        />
      </div>
    </div>
  );
}
