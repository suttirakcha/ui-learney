"use client";

import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { pickLocalized } from "@/lib/learney";
import { cn } from "@/lib/utils";
import { useHomeShowcase } from "@/modules/home-showcase/hooks/useHomeShowcase";
import { HomeShowcase } from "@/modules/home-showcase/components/HomeShowcase";
import type {
  HomeShowcase as HomeShowcaseBanner,
  HomeShowcaseCta,
  HomeShowcaseFallbackContent,
} from "@/modules/home-showcase/types/home-showcase.type";
import type { HomePageData } from "@/types/learney";

type HomeHeroPremiumProps = {
  hero: HomePageData["hero"];
  socialProof: HomePageData["socialProof"];
  initialShowcase?: HomeShowcaseBanner | null;
  initialShowcaseState?: "ready" | "empty" | "error";
};

type ActionButtonProps = {
  cta: HomeShowcaseCta;
};

const HERO_BADGE = {
  th: "แพลตฟอร์มการเรียนรู้แห่งอนาคต",
  en: "Future-ready learning platform",
};

const DEFAULT_PRIMARY_CTA = {
  th: "เริ่มเรียนเลย",
  en: "Start learning",
};

const DEFAULT_SECONDARY_CTA = {
  th: "ค้นหาอาชีพที่เหมาะกับคุณ",
  en: "Find your ideal career",
};

const textAlignClassName = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
} as const;

function isNavigableHref(href?: string | null) {
  return Boolean(href && /^(\/|https?:\/\/)/i.test(href));
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function ActionButton({ cta }: ActionButtonProps) {
  if (isExternalHref(cta.href)) {
    return (
      <Button
        asChild
        size="lg"
        variant={cta.variant === "primary" ? "default" : "outline"}
        className={cn(
          "h-12 rounded-full px-6 text-sm font-semibold sm:text-base",
          cta.variant === "primary"
            ? "shadow-[0_18px_40px_rgba(255,111,174,0.28)]"
            : "border-white/70 bg-white/65 shadow-[0_12px_28px_rgba(171,148,208,0.15)] backdrop-blur-md hover:bg-white/80 dark:border-white/10 dark:bg-white/8 dark:hover:bg-white/12",
        )}
      >
        <a href={cta.href} target="_blank" rel="noreferrer">
          {cta.text}
          {cta.variant === "primary" ? <ArrowRight className="h-4 w-4" /> : null}
        </a>
      </Button>
    );
  }

  return (
    <Button
      asChild
      size="lg"
      variant={cta.variant === "primary" ? "default" : "outline"}
      className={cn(
        "h-12 rounded-full px-6 text-sm font-semibold sm:text-base",
        cta.variant === "primary"
          ? "shadow-[0_18px_40px_rgba(255,111,174,0.28)]"
          : "border-white/70 bg-white/65 shadow-[0_12px_28px_rgba(171,148,208,0.15)] backdrop-blur-md hover:bg-white/80 dark:border-white/10 dark:bg-white/8 dark:hover:bg-white/12",
      )}
    >
      <Link href={cta.href}>
        {cta.text}
        {cta.variant === "primary" ? <ArrowRight className="h-4 w-4" /> : null}
      </Link>
    </Button>
  );
}

function buildFallbackContent(
  hero: HomePageData["hero"],
  locale: "th" | "en",
): HomeShowcaseFallbackContent {
  return {
    badge: HERO_BADGE[locale],
    title: pickLocalized(hero.title, locale),
    subtitle: pickLocalized(hero.subtitle, locale),
    primaryCta: {
      text: DEFAULT_PRIMARY_CTA[locale],
      href: "/courses",
      variant: "primary",
    },
    secondaryCta: {
      text: DEFAULT_SECONDARY_CTA[locale],
      href: "/career-assessment",
      variant: "secondary",
    },
  };
}

function buildBannerCtas(banner: HomeShowcaseBanner | null) {
  if (!banner) {
    return [];
  }

  const ctas: HomeShowcaseCta[] = [];
  const primaryText =
    typeof banner.primaryText === "string" ? banner.primaryText : "";
  const primaryHref =
    typeof banner.primaryHref === "string" ? banner.primaryHref : "";
  const secondaryText =
    typeof banner.secondaryText === "string" ? banner.secondaryText : "";
  const secondaryHref =
    typeof banner.secondaryHref === "string" ? banner.secondaryHref : "";

  if (primaryText && isNavigableHref(primaryHref)) {
    ctas.push({
      text: primaryText,
      href: primaryHref,
      variant: "primary",
    });
  }

  if (secondaryText && isNavigableHref(secondaryHref)) {
    ctas.push({
      text: secondaryText,
      href: secondaryHref,
      variant: "secondary",
    });
  }

  return ctas;
}

function formatRatingValue(value?: string | null) {
  if (!value) return "-";
  return value.includes("/") ? value : `${value}/5`;
}

function HomeHeroPremiumContent({
  hero,
  socialProof,
  initialShowcase,
  initialShowcaseState = initialShowcase ? "ready" : "empty",
}: HomeHeroPremiumProps) {
  const { locale } = usePreference();
  const { data: banner, isLoading, isError } = useHomeShowcase(
    initialShowcaseState === "error" ? undefined : initialShowcase,
  );
  const fallbackContent = buildFallbackContent(hero, locale);
  const content = banner
    ? {
        badge: banner.badge || fallbackContent.badge,
        title: banner.title || fallbackContent.title,
        subtitle: banner.subtitle || fallbackContent.subtitle,
      }
    : fallbackContent;
  const ctas = banner
    ? buildBannerCtas(banner)
    : [fallbackContent.primaryCta, fallbackContent.secondaryCta];
  const textAlign = banner?.textAlign ?? "left";
  const alignClassName = textAlignClassName[textAlign];
  const isMediaLeft = banner?.mediaPosition === "left";

  const stats = [
    {
      label: locale === "th" ? "คอร์สเรียน" : "Courses",
      value: socialProof.courses || "-",
      icon: BookOpen,
    },
    {
      label: locale === "th" ? "ผู้เรียน" : "Learners",
      value: socialProof.students || "-",
      icon: Users,
    },
    {
      label: locale === "th" ? "ผู้สอนมืออาชีพ" : "Professional instructors",
      value: socialProof.instructors || "-",
      icon: GraduationCap,
    },
    {
      label: locale === "th" ? "อัตราความพึงพอใจ" : "Satisfaction",
      value: formatRatingValue(socialProof.rating),
      icon: Star,
    },
  ];

  return (
    <section className="relative overflow-hidden py-6 sm:py-8 lg:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-6 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(255,155,198,0.26),transparent_34%),radial-gradient(circle_at_top_right,rgba(167,139,250,0.22),transparent_36%),radial-gradient(circle_at_bottom_center,rgba(139,203,255,0.22),transparent_34%)]" />
      <div className="section-frame relative">
        <div className="relative overflow-hidden rounded-[2.6rem] border border-white/60 bg-[linear-gradient(135deg,rgba(255,252,254,0.92),rgba(254,246,252,0.94),rgba(241,247,255,0.95))] p-6 shadow-[0_30px_90px_rgba(161,121,205,0.16)] backdrop-blur-xl sm:p-8 lg:p-10 xl:p-12 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(32,25,49,0.92),rgba(34,25,56,0.94),rgba(23,37,60,0.92))]">
          <div className="pointer-events-none absolute -left-12 top-8 h-40 w-40 rounded-full bg-pink-200/45 blur-3xl dark:bg-pink-400/10" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-full bg-sky-200/45 blur-3xl dark:bg-sky-400/10" />
          <div className="pointer-events-none absolute right-[20%] top-0 h-28 w-28 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-400/10" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center xl:gap-10">
            <div
              className={cn(
                "flex flex-col gap-6",
                alignClassName,
                isMediaLeft ? "lg:order-2" : "",
              )}
            >
              <Badge className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-foreground/75 shadow-sm dark:border-white/10 dark:bg-white/10">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                {content.badge}
              </Badge>

              <div className="space-y-4">
                <h1 className="max-w-3xl whitespace-pre-line text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[4.25rem] xl:text-[4.9rem]">
                  {content.title}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-foreground/72 sm:text-lg sm:leading-8">
                  {content.subtitle}
                </p>
              </div>

              {ctas.length ? (
                <div
                  className={cn(
                    "flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap",
                    textAlign === "center"
                      ? "sm:justify-center"
                      : textAlign === "right"
                        ? "sm:justify-end"
                        : "sm:justify-start",
                  )}
                >
                  {ctas.map((cta) => (
                    <ActionButton key={`${cta.variant}-${cta.href}`} cta={cta} />
                  ))}
                </div>
              ) : null}
            </div>

            <div className={cn("relative", isMediaLeft ? "lg:order-1" : "")}>
              <HomeShowcase
                banner={banner ?? null}
                state={
                  isLoading
                    ? "loading"
                    : isError || initialShowcaseState === "error"
                      ? "error"
                      : banner
                        ? "ready"
                        : "empty"
                }
              />
            </div>
          </div>

          <div className="relative mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.6rem] border border-white/60 bg-white/72 p-5 shadow-[0_14px_30px_rgba(161,121,205,0.12)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/6"
              >
                <item.icon className="h-5 w-5 text-primary" />
                <p className="mt-4 text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeHeroPremium(props: HomeHeroPremiumProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HomeHeroPremiumContent {...props} />
    </QueryClientProvider>
  );
}
