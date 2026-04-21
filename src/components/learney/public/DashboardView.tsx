"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardData } from "@/types/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { pickLocalized } from "@/lib/learney";
import { CourseCard } from "./CourseCard";

type DashboardHistoryEntry = {
  id: string;
  sessionId: string;
  date: string;
  summary: string;
  strengths: string[];
};

type DashboardWithHistory = DashboardData & {
  careerHistory?: DashboardHistoryEntry[];
};

export function DashboardView({ data }: { data: DashboardData | null }) {
  const { locale } = usePreference();
  const dashboard = data as DashboardWithHistory | null;

  if (!dashboard) {
    return (
      <main className="section-frame py-16">
        <div className="glass-panel rounded-lg p-8">
          <h1 className="text-2xl font-semibold text-foreground">
            {locale === "th"
              ? "เข้าสู่ระบบเพื่อดูแดชบอร์ด"
              : "Sign in to view your dashboard"}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {locale === "th"
              ? "ระบบจะบันทึกผล Skill Test, การเติบโต และ next step ของคุณไว้ที่นี่"
              : "This is where your skill-test history, growth, and next steps live."}
          </p>
          <div className="mt-5">
            <Link href="/login">
              <Button className="bg-primary text-primary-foreground">
                {locale === "th" ? "ไปหน้าเข้าสู่ระบบ" : "Go to login"}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section-frame space-y-8 py-12">
      <div className="soft-surface rounded-lg px-6 py-10">
        <h1 className="text-3xl font-semibold text-foreground">
          {dashboard.greeting.title}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {pickLocalized(dashboard.greeting.subtitle, locale)}
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        {Object.entries(dashboard.stats).map(([key, value]) => (
          <div key={key} className="glass-panel rounded-lg p-5">
            <p className="text-sm text-muted-foreground">{key}</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* ประวัติการทำ Career Assessment */}
          {dashboard.careerHistory && dashboard.careerHistory.length > 0 && (
              <div className="glass-panel rounded-lg p-6">
                <div className="flex items-end justify-between gap-4 mb-5">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {locale === "th"
                      ? "ประวัติการค้นหาตัวเอง"
                      : "Career Discovery History"}
                  </h2>
                  <Link href="/skill-test/age">
                    <Button variant="outline" size="sm">
                      {locale === "th"
                        ? "ทำแบบประเมินใหม่"
                        : "Retake Assessment"}
                    </Button>
                  </Link>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {dashboard.careerHistory.map((history) => (
                    <div
                      key={history.id}
                      className="rounded-lg bg-white/60 p-5 dark:bg-white/5 border border-slate-100 dark:border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs text-muted-foreground mb-2 font-medium">
                          {new Date(history.date).toLocaleDateString(
                            locale === "th" ? "th-TH" : "en-US",
                            { year: "numeric", month: "short", day: "numeric" },
                          )}
                        </div>
                        <p className="text-sm text-foreground line-clamp-3 mb-3">
                          {history.summary}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {history.strengths.slice(0, 3).map((strength) => (
                            <span
                              key={strength}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                            >
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link href={`/skill-test/result/${history.sessionId}`}>
                        <Button
                          variant="outline"
                          className="w-full text-xs h-8"
                        >
                          {locale === "th"
                            ? "ดูผลลัพธ์เต็ม"
                            : "View Full Result"}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground">
              {locale === "th" ? "Skill growth" : "Skill growth"}
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {dashboard.learningGraph.map((point) => (
                <div
                  key={point.category}
                  className="rounded-lg bg-white/60 p-4 dark:bg-white/5"
                >
                  <p className="text-sm text-muted-foreground">
                    {point.category}
                  </p>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>{locale === "th" ? "Before" : "Before"}</span>
                      <span>{point.before}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{locale === "th" ? "After" : "After"}</span>
                      <span>{point.after}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-lg p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {locale === "th"
                    ? "Recommended next steps"
                    : "Recommended next steps"}
                </h2>
                {dashboard.recentDiscovery ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {pickLocalized(dashboard.recentDiscovery.summary, locale)}
                  </p>
                ) : null}
              </div>
              <Link href="/skill-test">
                <Button variant="outline">
                  {locale === "th"
                    ? "ทำ Skill Test อีกครั้ง"
                    : "Retake skill test"}
                </Button>
              </Link>
            </div>
            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
              {dashboard.recommendedNextSteps.map((step) => (
                <p key={pickLocalized(step, locale)}>
                  {pickLocalized(step, locale)}
                </p>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {dashboard.enrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-panel rounded-lg p-5">
            <h2 className="text-lg font-semibold text-foreground">
              {locale === "th" ? "Achievements" : "Achievements"}
            </h2>
            <div className="mt-4 space-y-3">
              {dashboard.achievements.map((achievement) => (
                <div
                  key={achievement.key}
                  className="rounded-lg bg-white/60 p-3 text-sm text-muted-foreground dark:bg-white/5"
                >
                  {achievement.label} {achievement.unlocked ? "✓" : ""}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-lg p-5">
            <h2 className="text-lg font-semibold text-foreground">
              {locale === "th" ? "Checklist" : "Checklist"}
            </h2>
            <div className="mt-4 space-y-3">
              {dashboard.checklist.map((item) => (
                <div
                  key={pickLocalized(item.label, locale)}
                  className="rounded-lg bg-white/60 p-3 text-sm text-muted-foreground dark:bg-white/5"
                >
                  {item.done ? "✓ " : ""}
                  {pickLocalized(item.label, locale)}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
