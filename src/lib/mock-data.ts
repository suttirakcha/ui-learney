import { Users, GraduationCap, BookOpen, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Single source of truth for courses is src/data/courses.ts
// This file only holds UI config that is NOT course data

export type StatItem = {
  value: string;
  label: string;
  Icon: LucideIcon;
};

export const statsConfig: StatItem[] = [
  { value: "73K+", label: "Students", Icon: Users },
  { value: "500+", label: "Expert Instructors", Icon: GraduationCap },
  { value: "1,200+", label: "Courses", Icon: BookOpen },
  { value: "4.8/5", label: "Rating", Icon: Star },
];
