"use client";

import Link from "next/link";
import { BookOpen, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CourseStat } from "@/types/analytics";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}

interface InstructorCourseCardProps {
  course: CourseStat;
}

export function InstructorCourseCard({
  course,
}: InstructorCourseCardProps) {
  return (
    <Card className="h-full border-border/60 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            {course.category?.name ?? "GENERAL"}
          </span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-amber-300 text-amber-400" />
            {course.rating.toFixed(1)}
          </div>
        </div>
        <CardTitle className="line-clamp-2 text-lg leading-snug">
          {course.courseName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-6">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-muted-foreground">ยอดขาย</p>
            <p className="mt-1 text-lg font-semibold">{course.sales}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-muted-foreground">รายได้</p>
            <p className="mt-1 text-lg font-semibold">
              {formatCurrency(course.revenue)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Users className="h-4 w-4" />
            {course.students} ผู้เรียน
          </span>
          <span className="inline-flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            พร้อมจัดการบทเรียน
          </span>
        </div>

        <Button asChild className="mt-auto w-full">
          <Link href={`/instructor/courses/${course.courseId}/lessons`}>
            จัดการบทเรียน
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
