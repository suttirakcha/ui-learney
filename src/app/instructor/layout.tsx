"use client";

import { InstructorSidebar } from "@/components/instructor/InstructorSidebar";
import { ReactNode } from "react";

export default function InstructorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="md:flex">
        <InstructorSidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-12">{children}</main>
      </div>
    </div>
  );
}
