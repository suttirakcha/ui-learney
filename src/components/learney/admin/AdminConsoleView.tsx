"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AdminOverviewData, AdminSectionData } from "@/types/learney";
import { adminSections, pickLocalized } from "@/lib/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { applyAdminAction } from "@/lib/api/experience.service";

function SectionSidebar({ active }: { active?: string }) {
  const { locale } = usePreference();

  return (
    <aside className="glass-panel h-fit rounded-lg p-4">
      <div className="scrollbar-none flex gap-2 overflow-x-auto lg:block lg:space-y-1">
        <Link
          href="/admin"
          className={`flex-none rounded-lg px-3 py-2 text-sm lg:block ${
            !active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          {locale === "th" ? "Dashboard" : "Dashboard"}
        </Link>
        {adminSections.map((section) => (
          <Link
            key={section.slug}
            href={`/admin/${section.slug}`}
            className={`flex-none rounded-lg px-3 py-2 text-sm lg:block ${
              active === section.slug
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {pickLocalized(section.label, locale)}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export function AdminOverviewView({ data }: { data: AdminOverviewData }) {
  const { locale } = usePreference();

  return (
    <main className="section-frame grid gap-6 py-10 xl:grid-cols-[280px_1fr]">
      <SectionSidebar />
      <section className="space-y-6">
        <div className="soft-surface rounded-lg px-6 py-10">
          <h1 className="text-3xl font-semibold text-foreground">
            {locale === "th" ? "Admin Dashboard" : "Admin Dashboard"}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {locale === "th"
              ? "ควบคุมหน้าเว็บสาธารณะ คอร์ส คอมมูนิตี้ และ AI Content Studio จากที่เดียว"
              : "Control the public site, courses, community, and AI Content Studio from one place."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.cards.map((card) => (
            <div key={card.label} className="glass-panel rounded-lg p-5">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground">
              {locale === "th" ? "Quick actions" : "Quick actions"}
            </h2>
            <div className="mt-4 grid gap-3">
              {data.quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <Button variant="outline" className="w-full justify-start">
                    {action.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground">
              {locale === "th" ? "Latest reviews" : "Latest reviews"}
            </h2>
            <div className="mt-4 space-y-4">
              {data.latestReviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-lg border border-white/40 bg-white/50 p-4 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-foreground">{review.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {"★".repeat(review.rating)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function AdminSectionView({
  section,
  data,
}: {
  section: string;
  data: AdminSectionData;
}) {
  const { locale } = usePreference();
  const router = useRouter();
  const [aiForm, setAiForm] = useState({
    title: "",
    categoryKey: "business",
    targetAudience: "",
    level: "Intermediate",
    learningGoal: "",
    type: "COURSE_BLUEPRINT",
  });

  const sectionTitle = useMemo(
    () =>
      adminSections.find((item) => item.slug === section)?.label ?? {
        th: "Admin",
        en: "Admin",
      },
    [section],
  );

  const handleAction = async (
    action: string,
    payload?: Record<string, unknown>,
  ) => {
    try {
      await applyAdminAction(section, action, payload);
      toast.success(locale === "th" ? "อัปเดตแล้ว" : "Updated");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(locale === "th" ? "อัปเดตไม่สำเร็จ" : "Update failed");
    }
  };

  const items = (data.items as Array<Record<string, unknown>> | undefined) ?? [];

  return (
    <main className="section-frame grid gap-6 py-10 xl:grid-cols-[280px_1fr]">
      <SectionSidebar active={section} />
      <section className="space-y-6">
        <div className="soft-surface rounded-lg px-6 py-10">
          <h1 className="text-3xl font-semibold text-foreground">
            {pickLocalized(sectionTitle, locale)}
          </h1>
        </div>

        {(section === "ai-course-builder" ||
          section === "ai-lesson-generator" ||
          section === "ai-video-content-studio" ||
          section === "ai-case-study-generator" ||
          section === "ai-quiz-generator" ||
          section === "course-expansion-suggestions") && (
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground">
              {locale === "th" ? "Run AI job" : "Run AI job"}
            </h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Input
                value={aiForm.title}
                onChange={(event) =>
                  setAiForm((current) => ({
                    ...current,
                    title: event.currentTarget.value,
                  }))
                }
                placeholder={locale === "th" ? "Course title" : "Course title"}
              />
              <Input
                value={aiForm.categoryKey}
                onChange={(event) =>
                  setAiForm((current) => ({
                    ...current,
                    categoryKey: event.currentTarget.value,
                  }))
                }
                placeholder="category-key"
              />
              <Input
                value={aiForm.targetAudience}
                onChange={(event) =>
                  setAiForm((current) => ({
                    ...current,
                    targetAudience: event.currentTarget.value,
                  }))
                }
                placeholder={locale === "th" ? "Target audience" : "Target audience"}
              />
              <Input
                value={aiForm.level}
                onChange={(event) =>
                  setAiForm((current) => ({
                    ...current,
                    level: event.currentTarget.value,
                  }))
                }
                placeholder="Intermediate"
              />
            </div>
            <Textarea
              value={aiForm.learningGoal}
              onChange={(event) =>
                setAiForm((current) => ({
                  ...current,
                  learningGoal: event.currentTarget.value,
                }))
              }
              className="mt-4 min-h-24 rounded-lg"
              placeholder={locale === "th" ? "Learning goal" : "Learning goal"}
            />
            <div className="mt-4 flex justify-end">
              <Button
                className="bg-primary text-primary-foreground"
                onClick={() =>
                  void handleAction("run_ai_job", {
                    ...aiForm,
                    type:
                      section === "ai-lesson-generator"
                        ? "LESSON_BUNDLE"
                        : section === "ai-video-content-studio"
                          ? "VIDEO_BUNDLE"
                          : section === "ai-case-study-generator"
                            ? "CASE_STUDY_BUNDLE"
                            : section === "ai-quiz-generator"
                              ? "QUIZ_BUNDLE"
                              : section === "course-expansion-suggestions"
                                ? "COURSE_SUGGESTION"
                                : aiForm.type,
                  })
                }
              >
                {locale === "th" ? "Generate" : "Generate"}
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {items.length ? (
            items.map((item, index) => (
              <div
                key={String(item.id ?? item.slug ?? `${section}-${index}`)}
                className="glass-panel rounded-lg p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {String(
                        item.courseName ??
                          item.displayName ??
                          item.slug ??
                          item.title ??
                          item.snapshotType ??
                          "Item",
                      )}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {String(
                        item.workflowStatus ??
                          item.type ??
                          item.ageGroup ??
                          item.salaryRange ??
                          item.email ??
                          "",
                      )}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {section === "courses" ? (
                      <>
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={() =>
                            void handleAction("toggle_popular", {
                              courseId: item.id,
                              value: !item.isPopular,
                            })
                          }
                        >
                          {locale === "th" ? "Toggle Popular" : "Toggle Popular"}
                        </Button>
                        <Button
                          className="w-full bg-primary text-primary-foreground sm:w-auto"
                          onClick={() =>
                            void handleAction(
                              item.isPublished ? "unpublish_course" : "publish_course",
                              { courseId: item.id },
                            )
                          }
                        >
                          {item.isPublished
                            ? locale === "th"
                              ? "Unpublish"
                              : "Unpublish"
                            : locale === "th"
                              ? "Publish"
                              : "Publish"}
                        </Button>
                      </>
                    ) : null}

                    {section === "fixed-categories" ? (
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() =>
                          void handleAction("toggle_visibility", {
                            categoryId: item.id,
                            value: !item.visible,
                          })
                        }
                      >
                        {item.visible ? "Hide" : "Show"}
                      </Button>
                    ) : null}

                    {section === "instructors" ? (
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() =>
                          void handleAction("toggle_visibility", {
                            instructorId: item.id,
                            value: !item.visible,
                          })
                        }
                      >
                        {item.visible ? "Hide" : "Show"}
                      </Button>
                    ) : null}

                    {section === "ratings-reviews" ? (
                      <>
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={() =>
                            void handleAction("toggle_visibility", {
                              reviewId: item.id,
                              value: !item.visible,
                            })
                          }
                        >
                          {item.visible ? "Hide" : "Show"}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={() =>
                            void handleAction("pin_review", {
                              reviewId: item.id,
                              value: !item.pinned,
                            })
                          }
                        >
                          {item.pinned ? "Unpin" : "Pin"}
                        </Button>
                      </>
                    ) : null}

                    {section === "community" && "threads" in data === false ? null : null}

                    {(section === "content-review-queue" ||
                      section === "ai-draft-approval") && item.id ? (
                      <Button
                        className="w-full bg-primary text-primary-foreground sm:w-auto"
                        onClick={() =>
                          void handleAction("approve_draft", {
                            draftId: item.id,
                          })
                        }
                      >
                        {locale === "th" ? "Approve" : "Approve"}
                      </Button>
                    ) : null}
                  </div>
                </div>

                {item.content ? (
                  <pre className="mt-4 overflow-auto rounded-lg bg-white/60 p-4 text-xs text-muted-foreground dark:bg-white/5">
                    {JSON.stringify(item.content, null, 2)}
                  </pre>
                ) : null}
              </div>
            ))
          ) : "threads" in data || "replies" in data ? (
            <div className="grid gap-6 xl:grid-cols-2">
              {(["threads", "replies"] as const).map((key) => (
                <div key={key} className="glass-panel rounded-lg p-5">
                  <h2 className="text-lg font-semibold text-foreground">{key}</h2>
                  <div className="mt-4 space-y-3">
                    {((data[key] as Array<Record<string, unknown>> | undefined) ?? []).map(
                      (item) => (
                        <div key={String(item.id)} className="rounded-lg bg-white/60 p-4 dark:bg-white/5">
                          <p className="font-medium text-foreground">
                            {String(item.content ?? item.reason ?? item.id)}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {String(item.moderationStatus ?? item.reportCount ?? "")}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : section === "analytics" ? (
            <div className="grid gap-6 xl:grid-cols-2">
              {(data.snapshots as Array<Record<string, unknown>> | undefined)?.map((snapshot) => (
                <div key={String(snapshot.id)} className="glass-panel rounded-lg p-5">
                  <p className="eyebrow">{String(snapshot.snapshotType)}</p>
                  <pre className="mt-3 overflow-auto rounded-lg bg-white/60 p-4 text-xs text-muted-foreground dark:bg-white/5">
                    {JSON.stringify(snapshot.payload, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-lg p-6 text-muted-foreground">
              {locale === "th" ? "ยังไม่มีข้อมูลในส่วนนี้" : "No data for this section yet."}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
