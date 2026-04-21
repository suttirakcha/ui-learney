"use client";

import { usePathname } from "next/navigation";

import { resolveMascotMode, shouldHideMascot } from "@/lib/mascot";
import { MascotAssistant } from "./MascotAssistant";

export function RouteMascotAssistant() {
  const pathname = usePathname();

  if (shouldHideMascot(pathname)) {
    return null;
  }

  return (
    <MascotAssistant
      mode={resolveMascotMode(pathname)}
      position="bottom-right"
      size="md"
    />
  );
}
