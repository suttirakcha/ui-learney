"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Brain, Sparkles, Users } from "lucide-react";
import { HomePageData } from "@/types/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { pickLocalized } from "@/lib/learney";
import { CourseCard } from "./CourseCard";
import { Button } from "@/components/ui/button";

export function HomePageView({ data }: { data: HomePageData }) {
  const { locale } = usePreference();

  return (
    <main className="pb-20">
      <section className="hero-surface relative overflow-hidden">
        <div className="orb-pink pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96" />
        <div className="orb-purple pointer-events-none absolute bottom-[-8rem] left-[38%] h-72 w-72 rounded-full blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div className="orb-yellow pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full blur-3xl sm:h-80 sm:w-80" />

        <div className="section-frame relative grid min-h-[76vh] items-end gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="space-y-6 pb-6">
            <p className="eyebrow">
              {locale === "th" ? "LEARNEY FOR THE AI ERA" : "LEARNEY FOR THE AI ERA"}
            </p>
            <div className="space-y-4">
              <h1 className="balance-text max-w-3xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                {pickLocalized(data.hero.title, locale)}
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
                {pickLocalized(data.hero.subtitle, locale)}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {data.hero.ctas.map((cta) => (
                <Link key={cta.href} href={cta.href} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant={cta.href === "/courses" ? "default" : "outline"}
                    className={`w-full sm:w-auto ${
                      cta.href === "/courses"
                        ? ""
                        : "border-white/55 bg-white/70 hover:bg-white/85 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/16"
                    }`}
                  >
                    {pickLocalized(cta.label, locale)}
                  </Button>
                </Link>
              ))}
            </div>

            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              <div className="glass-panel rounded-[1.5rem] p-4">
                <p className="text-sm text-muted-foreground">
                  {locale === "th" ? "ผู้เรียน" : "Learners"}
                </p>
                <p className="mt-2 text-2xl font-semibold">{data.socialProof.students}</p>
              </div>
              <div className="glass-panel rounded-[1.5rem] p-4">
                <p className="text-sm text-muted-foreground">
                  {locale === "th" ? "ผู้สอน" : "Instructors"}
                </p>
                <p className="mt-2 text-2xl font-semibold">{data.socialProof.instructors}</p>
              </div>
              <div className="glass-panel rounded-[1.5rem] p-4">
                <p className="text-sm text-muted-foreground">
                  {locale === "th" ? "คอร์ส" : "Courses"}
                </p>
                <p className="mt-2 text-2xl font-semibold">{data.socialProof.courses}</p>
              </div>
              <div className="glass-panel rounded-[1.5rem] p-4">
                <p className="text-sm text-muted-foreground">
                  {locale === "th" ? "เรตติ้ง" : "Rating"}
                </p>
                <p className="mt-2 text-2xl font-semibold">{data.socialProof.rating}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {data.categories.slice(0, 4).map((category) => (
              <Link
                key={category.slug}
                href={`/courses?category=${category.slug}`}
                className="card-hover rounded-[1.5rem] p-5 text-foreground transition duration-300 hover:-translate-y-1.5"
              >
                <div className="space-y-3">
                  <div
                    className="h-11 w-11 rounded-2xl shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${category.color ?? "#ef8ea8"} 0%, color-mix(in srgb, ${category.color ?? "#ef8ea8"} 38%, #ffffff 62%) 100%)`,
                    }}
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {pickLocalized(category.name, locale)}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {locale === "th"
                        ? "เข้าสู่คอร์สที่คัดมาแล้วในหมวดนี้"
                        : "Jump into curated courses in this category."}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-frame py-16">
        <div className="section-surface-alt rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.benefits.map((benefit, index) => {
              const Icon = [Brain, Users, BadgeCheck][index] ?? Sparkles;

              return (
                <div key={index} className="surface-card rounded-[1.5rem] p-5">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-base font-medium text-foreground">
                    {pickLocalized(benefit, locale)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-frame space-y-12 py-4">
        {data.audienceSections.map((section) => (
          <div key={section.key} className="section-surface rounded-[2rem] p-6 sm:p-8">
            <div className="space-y-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow">{section.key.toUpperCase()}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-foreground">
                    {pickLocalized(section.title, locale)}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {pickLocalized(section.description, locale)}
                  </p>
                </div>
                <Link
                  href="/courses"
                  className="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground md:inline-flex"
                >
                  {locale === "th" ? "ดูทั้งหมด" : "View all"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {section.courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="section-frame py-16">
        <div className="highlight-surface rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">{locale === "th" ? "Popular Right Now" : "Popular Right Now"}</p>
              <h2 className="mt-2 text-2xl font-semibold">
                {locale === "th" ? "คอร์สจัดอันดับโดยแอดมิน" : "Admin-ranked popular courses"}
              </h2>
            </div>
            <Link href="/courses?sort=most-popular">
              <Button variant="outline">
                {locale === "th" ? "ดูคอร์สยอดนิยม" : "View Popular Courses"}
              </Button>
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {data.featuredCourses.map((item) => (
              <div key={item.course.id} className="space-y-3">
                <p className="eyebrow">
                  #{item.rank} {item.badge}
                </p>
                <CourseCard course={item.course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-frame grid gap-5 py-16 xl:grid-cols-2">
        <div className="psychology-surface rounded-[2rem] p-6">
          <div className="glass-panel rounded-[1.5rem] p-6">
            <p className="eyebrow">{locale === "th" ? "Promotions" : "Promotions"}</p>
            <div className="mt-4 space-y-4">
              {data.promotions.slice(0, 3).map((promotion) => (
                <Link
                  key={promotion.id}
                  href="/promotions"
                  className="block rounded-[1.25rem] border border-white/40 bg-white/50 p-4 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {pickLocalized(promotion.title, locale)}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {pickLocalized(promotion.description, locale)}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="calm-surface rounded-[2rem] p-6">
          <div className="glass-panel rounded-[1.5rem] p-6">
            <p className="eyebrow">{locale === "th" ? "Reviews" : "Reviews"}</p>
            <div className="mt-4 space-y-4">
              {data.reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-[1.25rem] border border-white/40 bg-white/50 p-4 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium">{review.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {"★".repeat(review.rating)}
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
