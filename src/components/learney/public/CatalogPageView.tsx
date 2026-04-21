"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CatalogData } from "@/types/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { useTheme } from "@/contexts/ThemeContext";
import { pickLocalized } from "@/lib/learney";
import { CourseCard } from "./CourseCard";
import { ThemeParticles } from "@/components/ThemeParticles";

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
  const { aiMessage } = useTheme();
  const filters = useCatalogFilters();
  const currentSearch = filters.getValue("search");

  const chips = useMemo(
    () => [
      {
        key: "promotion",
        value: "true",
        label: { th: "มีโปรโมชัน", en: "On Promotion" },
      },
      {
        key: "rating",
        value: "4",
        label: { th: "4 ดาวขึ้นไป", en: "4+ stars" },
      },
      {
        key: "level",
        value: "Beginner",
        label: { th: "Beginner", en: "Beginner" },
      },
      {
        key: "level",
        value: "Intermediate",
        label: { th: "Intermediate", en: "Intermediate" },
      },
    ],
    [],
  );

  return (
    <>
      <ThemeParticles />
      {aiMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 z-50 mx-4 max-w-md -translate-x-1/2 rounded-2xl p-4 text-center text-sm shadow-2xl glass-panel"
        >
          <p className="font-medium">{aiMessage}</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 text-xs"
            onClick={() => {
              // Theme switching will be wired to real settings later.
            }}
          >
            <Settings className="mr-1 h-3 w-3" />
            เปลี่ยนธีม
          </Button>
        </motion.div>
      )}

      <main className="section-frame relative z-10 space-y-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="soft-surface rounded-lg px-6 py-10"
        >
          <div className="max-w-3xl space-y-4">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Course Explorer
            </motion.p>
            <motion.h1
              className="w-full text-3xl font-semibold text-foreground sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {locale === "th" ? "คอร์สทั้งหมด" : "All Courses"}
            </motion.h1>
            <motion.p
              className="w-full text-sm text-muted-foreground sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {locale === "th"
                ? "ค้นหาคอร์สที่ตรงกับเป้าหมาย ทักษะ และจังหวะการเติบโตของคุณ"
                : "Find the courses that fit your goals, skill level, and next move."}
            </motion.p>
            <motion.label
              className="relative block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                defaultValue={currentSearch}
                placeholder={
                  locale === "th"
                    ? "ค้นหาคอร์ส ผู้สอน หรือหมวดหมู่"
                    : "Search courses, instructors, or categories"
                }
                className="h-12 rounded-lg border-white/50 bg-white/80 pl-11 shimmer"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    filters.update({
                      search: (event.currentTarget as HTMLInputElement).value,
                    });
                  }
                }}
              />
            </motion.label>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="glass-panel h-fit rounded-lg p-5">
            <p className="text-sm font-medium text-foreground">
              {locale === "th" ? "ตัวกรอง" : "Filters"}
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <label className="grid gap-2 text-sm">
                <span className="text-muted-foreground">
                  {locale === "th" ? "หมวดหมู่" : "Category"}
                </span>
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
                <span className="text-muted-foreground">
                  {locale === "th" ? "ราคา" : "Price"}
                </span>
                <select
                  className="rounded-lg border border-border bg-background px-3 py-2"
                  value={filters.getValue("price")}
                  onChange={(event) =>
                    filters.update({ price: event.currentTarget.value })
                  }
                >
                  <option value="">{locale === "th" ? "ทั้งหมด" : "All"}</option>
                  <option value="under-5000">
                    {locale === "th" ? "ต่ำกว่า 5,000" : "Under 5,000"}
                  </option>
                  <option value="5000-8000">
                    {locale === "th" ? "5,000 - 8,000" : "5,000 - 8,000"}
                  </option>
                  <option value="over-8000">
                    {locale === "th" ? "มากกว่า 8,000" : "Over 8,000"}
                  </option>
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="text-muted-foreground">
                  {locale === "th" ? "ระดับ" : "Difficulty"}
                </span>
                <select
                  className="rounded-lg border border-border bg-background px-3 py-2"
                  value={filters.getValue("level")}
                  onChange={(event) =>
                    filters.update({ level: event.currentTarget.value })
                  }
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
                <span className="text-muted-foreground">
                  {locale === "th" ? "เรียงตาม" : "Sort"}
                </span>
                <select
                  className="rounded-lg border border-border bg-background px-3 py-2"
                  value={filters.getValue("sort") || "most-popular"}
                  onChange={(event) =>
                    filters.update({ sort: event.currentTarget.value })
                  }
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

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="space-y-5"
          >
            <motion.div className="flex flex-wrap gap-2">
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
            </motion.div>

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

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {data.items.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.4 + index * 0.05,
                  }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              className="glass-chip flex flex-wrap gap-2"
            >
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
            </motion.div>
          </motion.section>
        </div>
      </main>
    </>
  );
}
