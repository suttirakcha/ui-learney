"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowRight, RefreshCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  CareerCardData,
  CourseCardData,
  SkillTestIntroData,
  SkillTestResultData,
} from "@/types/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { pickLocalized } from "@/lib/learney";
import { createSkillAttempt } from "@/lib/api/experience.service";
import { AssessmentStepper } from "@/components/skill-test/AssessmentStepper";
import { CourseCard } from "./CourseCard";

const skillCategoryLabels = {
  Creativity: { th: "ความคิดสร้างสรรค์", en: "Creativity" },
  Leadership: { th: "ภาวะผู้นำ", en: "Leadership" },
  "Helping Others": { th: "การช่วยเหลือผู้อื่น", en: "Helping Others" },
  Analysis: { th: "การวิเคราะห์", en: "Analysis" },
  Communication: { th: "การสื่อสาร", en: "Communication" },
  Teamwork: { th: "การทำงานเป็นทีม", en: "Teamwork" },
} as const;

function getSkillCategoryLabel(category: string, locale: "th" | "en") {
  return skillCategoryLabels[category as keyof typeof skillCategoryLabels]?.[
    locale
  ] ?? category;
}

export function SkillTestIntroView({ data }: { data: SkillTestIntroData }) {
  const { locale } = usePreference();

  return (
    <main className="section-frame space-y-10 py-12">
      <section className="soft-surface rounded-3xl px-6 py-12">
        <div className="max-w-3xl space-y-5">
          <p className="eyebrow">
            {locale === "th" ? "Skill Discovery" : "Skill Discovery"}
          </p>
          <h1 className="text-4xl font-semibold text-foreground">
            {pickLocalized(data.intro.title, locale)}
          </h1>
          <p className="text-lg text-muted-foreground">
            {pickLocalized(data.intro.subtitle, locale)}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/skill-test/age">
              <Button size="lg" className="bg-primary text-primary-foreground">
                {locale === "th" ? "เริ่มทำแบบทดสอบ" : "Start skill test"}
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline">
                {locale === "th" ? "ดูคอร์สก่อน" : "Browse courses"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {data.intro.stats.map((stat) => (
          <div key={stat.label} className="glass-panel rounded-3xl p-5">
            <p className="text-sm capitalize text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{stat.value}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export function SkillAgeSelectionView({ data }: { data: SkillTestIntroData }) {
  const { locale } = usePreference();

  return (
    <main className="section-frame space-y-8 py-12">
      <div className="soft-surface rounded-3xl px-6 py-10">
        <p className="eyebrow">
          {locale === "th" ? "Choose your stage" : "Choose your stage"}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          {locale === "th" ? "เลือกช่วงวัยของคุณ" : "Choose your age group"}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {locale === "th"
            ? "เลือกช่วงวัยเพื่อให้คำถามและคำแนะนำตรงกับบริบทของคุณมากขึ้น"
            : "Pick the stage that fits you so the questions and recommendations feel more relevant."}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {data.ageGroups.map((group) => (
          <Link
            key={group.id}
            href={`/skill-test/questions?ageGroup=${encodeURIComponent(group.ageGroup)}`}
            className="glass-panel rounded-3xl p-6 transition hover:-translate-y-0.5"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              {pickLocalized(group.title, locale)}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {pickLocalized(group.intro, locale)}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
              {locale === "th" ? "เริ่มช่วงวัยนี้" : "Start this stage"}
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export function SkillQuestionView({
  data,
  ageGroup,
  courseId,
  assessmentKind,
  sourceType,
}: {
  data: SkillTestIntroData;
  ageGroup: string;
  courseId?: string;
  assessmentKind?: string;
  sourceType?: string;
}) {
  const { locale } = usePreference();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const questionSet = data.questionSet;

  if (!questionSet?.questions.length) {
    return (
      <main className="section-frame py-12">
        <div className="glass-panel rounded-3xl p-8 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            {locale === "th" ? "ยังไม่พบคำถามสำหรับช่วงวัยนี้" : "No questions were found for this stage."}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {locale === "th"
              ? "ลองกลับไปเลือกช่วงวัยใหม่อีกครั้ง"
              : "Please go back and choose another age group."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/skill-test/age">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {locale === "th" ? "กลับไปเลือกช่วงวัย" : "Back to age groups"}
              </Button>
            </Link>
            <Link href="/skill-test">
              <Button className="bg-primary text-primary-foreground">
                <RefreshCcw className="mr-2 h-4 w-4" />
                {locale === "th" ? "เริ่มใหม่" : "Start over"}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section-frame py-12">
      <AssessmentStepper
        eyebrow={ageGroup}
        title={questionSet.title}
        isSubmitting={isSubmitting}
        onExit={() => router.push("/skill-test/age")}
        questions={questionSet.questions.map((question) => ({
          ...question,
          categoryLabel: getSkillCategoryLabel(question.category, locale),
        }))}
        onSubmit={async (answers) => {
          try {
            setIsSubmitting(true);
            const payload = {
              ageGroup,
              courseId,
              assessmentKind,
              sourceType,
              answers: questionSet.questions.map((question) => ({
                questionId: question.id,
                category: question.category,
                value: String(answers[question.id] ?? 3),
              })),
            };

            const result = await createSkillAttempt(payload);
            toast.success(
              locale === "th" ? "ประมวลผลผลลัพธ์แล้ว" : "Assessment complete",
            );
            router.push(result.resultPath);
          } catch {
            toast.error(
              locale === "th"
                ? "บันทึกคำตอบไม่สำเร็จ ลองอีกครั้งได้เลย"
                : "Could not save your answers. Please try again.",
            );
          } finally {
            setIsSubmitting(false);
          }
        }}
      />
    </main>
  );
}

export function SkillResultView({ data }: { data: SkillTestResultData }) {
  const { locale } = usePreference();
  const hasChart = data.chart.length > 0;

  return (
    <main className="section-frame space-y-8 py-12">
      <div className="soft-surface rounded-3xl px-6 py-10">
        <p className="eyebrow">{data.ageGroup || (locale === "th" ? "Skill Test" : "Skill Test")}</p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          {locale === "th" ? "ผลลัพธ์ของคุณ" : "Your result"}
        </h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          {pickLocalized(
            data.summary,
            locale,
          ) ||
            (locale === "th"
              ? "เราเตรียมสรุปภาพรวมและคำแนะนำต่อยอดให้คุณแล้ว"
              : "Your summary and next-step recommendations are ready.")}
        </p>
      </div>

      {hasChart ? (
        <div className="glass-panel rounded-3xl p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.chart.map((item) => (
              <div key={item.category} className="rounded-2xl bg-white/60 p-4 dark:bg-white/5">
                <p className="text-sm text-muted-foreground">
                  {getSkillCategoryLabel(item.category, locale)}
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{item.score}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-8 text-center text-muted-foreground">
          {locale === "th"
            ? "ยังไม่มีคะแนนย่อยแสดงในตอนนี้ แต่คุณสามารถดูคำแนะนำอาชีพและคอร์สต่อได้"
            : "Detailed scores are not available right now, but you can still continue to recommendations."}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link href={`/skill-test/careers/${data.attemptId}`}>
          <Button className="bg-primary text-primary-foreground">
            {locale === "th" ? "ดูสายอาชีพที่เหมาะ" : "Career recommendations"}
          </Button>
        </Link>
        <Link href={`/skill-test/courses/${data.attemptId}`}>
          <Button variant="outline">
            {locale === "th" ? "ดูคอร์สที่แนะนำ" : "Recommended courses"}
          </Button>
        </Link>
        <Link href="/skill-test/age">
          <Button variant="ghost">
            <RefreshCcw className="mr-2 h-4 w-4" />
            {locale === "th" ? "ทำใหม่อีกครั้ง" : "Retake test"}
          </Button>
        </Link>
      </div>
    </main>
  );
}

export function CareerRecommendationView({
  careers,
  attemptId,
}: {
  careers: CareerCardData[];
  attemptId: string;
}) {
  const { locale } = usePreference();

  return (
    <main className="section-frame space-y-8 py-12">
      <div className="soft-surface rounded-3xl px-6 py-10">
        <h1 className="text-3xl font-semibold text-foreground">
          {locale === "th" ? "สายอาชีพที่เหมาะกับคุณ" : "Career recommendations"}
        </h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          {locale === "th"
            ? "ดูภาพรวมของบทบาทที่เข้ากับจุดแข็งของคุณ และค่อยไปต่อที่คอร์สแนะนำ"
            : "See the roles that match your strengths, then continue to suggested courses."}
        </p>
      </div>

      {careers.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {careers.map((career) => (
            <article key={career.id} className="glass-panel rounded-3xl p-6">
              <p className="eyebrow">{career.matchPercentage}% match</p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground">
                {pickLocalized(career.name, locale)}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {pickLocalized(career.summary, locale)}
              </p>
              {career.salaryRange ? (
                <p className="mt-4 text-sm text-foreground">{career.salaryRange}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {career.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/70 px-3 py-1 text-xs text-muted-foreground dark:bg-white/5"
                  >
                    {getSkillCategoryLabel(skill, locale)}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            {locale === "th" ? "ยังไม่มีคำแนะนำอาชีพเฉพาะ" : "No specific career recommendations yet"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {locale === "th"
              ? "คุณยังสามารถไปดูคอร์สที่แนะนำต่อได้เลย"
              : "You can still continue to the recommended courses."}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link href={`/skill-test/result/${attemptId}`}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {locale === "th" ? "ย้อนกลับผลลัพธ์" : "Back to result"}
          </Button>
        </Link>
        <Link href={`/skill-test/courses/${attemptId}`}>
          <Button className="bg-primary text-primary-foreground">
            {locale === "th" ? "ไปต่อดูคอร์สแนะนำ" : "Continue to courses"}
          </Button>
        </Link>
        <Link href="/skill-test/age">
          <Button variant="ghost">
            <RefreshCcw className="mr-2 h-4 w-4" />
            {locale === "th" ? "เริ่มใหม่" : "Start over"}
          </Button>
        </Link>
      </div>
    </main>
  );
}

export function RecommendedCoursesView({
  courses,
  attemptId,
}: {
  courses: Array<CourseCardData & { matchPercentage?: number }>;
  attemptId: string;
}) {
  const { locale } = usePreference();

  return (
    <main className="section-frame space-y-8 py-12">
      <div className="soft-surface rounded-3xl px-6 py-10">
        <h1 className="text-3xl font-semibold text-foreground">
          {locale === "th" ? "คอร์สที่เราแนะนำ" : "Recommended courses"}
        </h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          {locale === "th"
            ? "เลือกคอร์สที่อยากเริ่มได้ทันที หรือย้อนกลับไปดูผลลัพธ์ก่อนก็ได้"
            : "Pick a course to start with, or go back to review your assessment results."}
        </p>
      </div>

      {courses.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="space-y-3">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{course.matchPercentage ?? 80}% match</span>
                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center gap-1 hover:text-foreground"
                >
                  {locale === "th" ? "เริ่มเรียนคอร์สนี้" : "Start learning"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            {locale === "th" ? "ยังไม่มีคอร์สแนะนำเฉพาะ" : "No specific course suggestions yet"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {locale === "th"
              ? "ลองกลับไปดูผลลัพธ์หรือดูคอร์สทั้งหมดในระบบได้เลย"
              : "You can revisit your result or browse all available courses."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/courses">
              <Button className="bg-primary text-primary-foreground">
                {locale === "th" ? "ดูคอร์สทั้งหมด" : "Browse all courses"}
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link href={`/skill-test/careers/${attemptId}`}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {locale === "th" ? "ย้อนกลับดูอาชีพ" : "Back to careers"}
          </Button>
        </Link>
        <Link href={`/skill-test/result/${attemptId}`}>
          <Button variant="outline">
            {locale === "th" ? "กลับหน้าผลลัพธ์" : "Back to result"}
          </Button>
        </Link>
        <Link href="/skill-test/age">
          <Button variant="ghost">
            <RefreshCcw className="mr-2 h-4 w-4" />
            {locale === "th" ? "เริ่มใหม่" : "Start over"}
          </Button>
        </Link>
      </div>
    </main>
  );
}
