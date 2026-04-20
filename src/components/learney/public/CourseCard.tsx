"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCardData } from "@/types/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { formatCurrency, formatNumber, pickLocalized } from "@/lib/learney";

export function CourseCard({
  course,
  actionLabel,
}: {
  course: CourseCardData;
  actionLabel?: string;
}) {
  const { locale } = usePreference();

  return (
    <article className="glass-panel flex h-full flex-col overflow-hidden rounded-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={course.coverImage}
          alt={pickLocalized(course.title, locale)}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{pickLocalized(course.category.name, locale)}</span>
            {course.badge ? (
              <span className="rounded-md bg-secondary/70 px-2 py-1 text-secondary-foreground">
                {course.badge}
              </span>
            ) : null}
          </div>
          <h3 className="text-lg font-semibold leading-snug break-words text-foreground">
            {pickLocalized(course.title, locale)}
          </h3>
          <p className="text-sm leading-6 text-muted-foreground">
            {pickLocalized(course.shortDescription, locale)}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span className="min-w-0 break-words">{course.instructor.name}</span>
          <span>{course.level}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
            {course.rating.toFixed(1)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-4 w-4" />
            {formatNumber(course.learners, locale)}
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            {course.discountPrice ? (
              <p className="text-sm text-muted-foreground line-through">
                {formatCurrency(course.price, locale)}
              </p>
            ) : null}
            <p className="text-lg font-semibold text-foreground">
              {formatCurrency(course.discountPrice ?? course.price, locale)}
            </p>
          </div>

          <Link href={`/courses/${course.slug}`} className="w-full sm:w-auto">
            <Button className="w-full bg-primary text-primary-foreground sm:w-auto">
              {actionLabel ?? (locale === "th" ? "ดูรายละเอียด" : "View Details")}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
