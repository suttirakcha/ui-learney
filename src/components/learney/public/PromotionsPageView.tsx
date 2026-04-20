"use client";

import { CalendarRange, Ticket } from "lucide-react";
import { PromotionsData } from "@/types/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { pickLocalized } from "@/lib/learney";
import { CourseCard } from "./CourseCard";

export function PromotionsPageView({ data }: { data: PromotionsData }) {
  const { locale } = usePreference();

  return (
    <main className="section-frame space-y-8 py-12">
      <div className="soft-surface rounded-lg px-6 py-10">
        <p className="eyebrow">
          {locale === "th" ? "Campaigns and Codes" : "Campaigns and Codes"}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          {locale === "th" ? "Promotion Page" : "Promotion Page"}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {locale === "th"
            ? "Flash sale, seasonal campaign, และ promo code "
            : "Flash sales, seasonal campaigns, and promo codes connected to real courses."}
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        {data.promotions.map((promotion) => (
          <article
            key={promotion.id}
            className="glass-panel rounded-lg overflow-hidden"
          >
            {promotion.banner ? (
              <div
                className="h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${promotion.banner})` }}
              />
            ) : null}
            <div className="space-y-4 p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-md bg-secondary/70 px-2 py-1 text-secondary-foreground">
                  {promotion.type}
                </span>
                {promotion.themeKey ? (
                  <span className="rounded-md bg-white/70 px-2 py-1 text-foreground dark:bg-white/10">
                    {promotion.themeKey}
                  </span>
                ) : null}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {pickLocalized(promotion.title, locale)}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {pickLocalized(promotion.description, locale)}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {promotion.discount ? (
                  <span className="inline-flex items-center gap-2">
                    <Ticket className="h-4 w-4" />
                    {promotion.discount}% OFF
                  </span>
                ) : null}
                {promotion.promoCode ? (
                  <span className="inline-flex items-center gap-2">
                    <CalendarRange className="h-4 w-4" />
                    {promotion.promoCode}
                  </span>
                ) : null}
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {promotion.courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
