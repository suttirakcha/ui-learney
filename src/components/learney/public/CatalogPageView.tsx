"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CatalogData } from "@/types/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { pickLocalized } from "@/lib/learney";
import { CourseCard } from "./CourseCard";

function useCatalogFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return {
    getValue: (key: string) => searchParams.get(key) ?? "",
    update: (updates: Record<string, string>) => {
      const next = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });

      next.delete("page");
      router.push(`${pathname}?${next.toString()}`);
    },
    goToPage: (page: number) => {
      const next = new URLSearchParams(searchParams.toString());
      next.set("page", String(page));
      router.push(`${pathname}?${next.toString()}`);
    },
  };
}

export function CatalogPageView({ data }: { data: CatalogData }) {
  const { locale } = usePreference();
  const filters = useCatalogFilters();
  const currentSearch = filters.getValue("search");

  const chips = useMemo(
    () => [
      { key: "promotion", value: "true", label: { th: "มีโปรโมชัน", en: "On Promotion" } },
      { key: "rating", value: "4", label: { th: "4 ดาวขึ้นไป", en: "4+ stars" } },
      { key: "level", value: "Beginner", label: { th: "Beginner", en: "Beginner" } },
      { key: "level", value: "Intermediate", label: { th: "Intermediate", en: "Intermediate" } },
    ],
    [],
  );

  return (
    <main className="section-frame space-y-8 py-12">
      <div className="soft-surface rounded-lg px-6 py-10">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">{locale === "th" ? "Course Explorer" : "Course Explorer"}</p>
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
            {locale === "th" ? "คอร์สทั้งหมด" : "All Courses"}
          </h1>
          <p className="text-muted-foreground">
            {locale === "th"
              ? "ค้นหาคอร์สที่ตรงกับเป้าหมาย ทักษะ และจังหวะการเติบโตของคุณ"
              : "Find the courses that fit your goals, skill level, and next move."}
          </p>
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              defaultValue={currentSearch}
              placeholder={
                locale === "th"
                  ? "ค้นหาคอร์ส ผู้สอน หรือหมวดหมู่"
                  : "Search courses, instructors, or categories"
              }
              className="h-12 rounded-lg border-white/50 bg-white/80 pl-11"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  filters.update({
                    search: (event.currentTarget as HTMLInputElement).value,
                  });
                }
              }}
            />
          </label>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <aside className="glass-panel h-fit rounded-lg p-5">
          <p className="text-sm font-medium text-foreground">
            {locale === "th" ? "ตัวกรอง" : "Filters"}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <label className="grid gap-2 text-sm">
              <span className="text-muted-foreground">{locale === "th" ? "หมวดหมู่" : "Category"}</span>
              <select
                className="rounded-lg border border-border bg-background px-3 py-2"
                value={filters.getValue("category")}
                onChange={(event) =>
                  filters.update({ category: event.currentTarget.value })
                }
              >
                <option value="">{locale === "th" ? "ทั้งหมด" : "All"}</option>
                {data.filters.categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {pickLocalized(category.label, locale)}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-muted-foreground">{locale === "th" ? "ราคา" : "Price"}</span>
              <select
                className="rounded-lg border border-border bg-background px-3 py-2"
                value={filters.getValue("price")}
                onChange={(event) => filters.update({ price: event.currentTarget.value })}
              >
                <option value="">{locale === "th" ? "ทั้งหมด" : "All"}</option>
                <option value="under-5000">{locale === "th" ? "ต่ำกว่า 5,000" : "Under 5,000"}</option>
                <option value="5000-8000">{locale === "th" ? "5,000 - 8,000" : "5,000 - 8,000"}</option>
                <option value="over-8000">{locale === "th" ? "มากกว่า 8,000" : "Over 8,000"}</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-muted-foreground">{locale === "th" ? "ระดับ" : "Difficulty"}</span>
              <select
                className="rounded-lg border border-border bg-background px-3 py-2"
                value={filters.getValue("level")}
                onChange={(event) => filters.update({ level: event.currentTarget.value })}
              >
                <option value="">{locale === "th" ? "ทั้งหมด" : "All"}</option>
                {data.filters.levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-muted-foreground">{locale === "th" ? "เรียงตาม" : "Sort"}</span>
              <select
                className="rounded-lg border border-border bg-background px-3 py-2"
                value={filters.getValue("sort") || "most-popular"}
                onChange={(event) => filters.update({ sort: event.currentTarget.value })}
              >
                {data.filters.sortOptions.map((sortOption) => (
                  <option key={sortOption} value={sortOption}>
                    {sortOption}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </aside>

        <section className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => {
              const active = filters.getValue(chip.key) === chip.value;

              return (
                <button
                  key={`${chip.key}-${chip.value}`}
                  type="button"
                  onClick={() =>
                    filters.update({
                      [chip.key]: active ? "" : chip.value,
                    } as Record<string, string>)
                  }
                  className={`rounded-lg border px-3 py-2 text-sm ${
                    active
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-border bg-white/70 text-muted-foreground dark:bg-white/5"
                  }`}
                >
                  {pickLocalized(chip.label, locale)}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {locale === "th"
                ? `พบ ${data.total} คอร์ส`
                : `${data.total} courses found`}
            </p>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() =>
                filters.update({
                  search: "",
                  category: "",
                  price: "",
                  level: "",
                  rating: "",
                  promotion: "",
                  sort: "most-popular",
                })
              }
            >
              {locale === "th" ? "ล้างตัวกรอง" : "Clear Filters"}
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {data.items.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.from({ length: data.totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => filters.goToPage(page)}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    page === data.page
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/70 text-muted-foreground dark:bg-white/5"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
