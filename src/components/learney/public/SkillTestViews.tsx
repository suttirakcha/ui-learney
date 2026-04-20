"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkillTestIntroData, SkillTestResultData, CareerCardData, CourseCardData } from "@/types/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { pickLocalized } from "@/lib/learney";
import { createSkillAttempt } from "@/lib/api/experience.service";
import { CourseCard } from "./CourseCard";

export function SkillTestIntroView({ data }: { data: SkillTestIntroData }) {
  const { locale } = usePreference();

  return (
    <main className="section-frame space-y-10 py-12">
      <section className="soft-surface rounded-lg px-6 py-12">
        <div className="max-w-3xl space-y-5">
          <p className="eyebrow">{locale === "th" ? "Positive Psychology" : "Positive Psychology"}</p>
          <h1 className="text-4xl font-semibold text-foreground">
            {pickLocalized(data.intro.title, locale)}
          </h1>
          <p className="text-lg text-muted-foreground">
            {pickLocalized(data.intro.subtitle, locale)}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/skill-test/age">
              <Button size="lg" className="bg-primary text-primary-foreground">
                {locale === "th" ? "Start Discovering Yourself" : "Start Discovering Yourself"}
              </Button>
            </Link>
            <Link href="/skill-test/age">
              <Button size="lg" variant="outline">
                {locale === "th" ? "View Sample Result" : "View Sample Result"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {data.intro.stats.map((stat) => (
          <div key={stat.label} className="glass-panel rounded-lg p-5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
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
      <div className="soft-surface rounded-lg px-6 py-10">
        <p className="eyebrow">{locale === "th" ? "Choose your stage" : "Choose your stage"}</p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          {locale === "th" ? "เลือกช่วงวัยของคุณ" : "Choose your age group"}
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {data.ageGroups.map((group) => (
          <Link
            key={group.id}
            href={`/skill-test/questions?ageGroup=${encodeURIComponent(group.ageGroup)}`}
            className="glass-panel rounded-lg p-6 transition hover:-translate-y-0.5"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              {group.ageGroup}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {pickLocalized(group.intro, locale)}
            </p>
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
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const questionSet = data.questionSet;

  const progress = useMemo(() => {
    const total = questionSet?.questions.length ?? 1;
    return Math.round((Object.keys(answers).length / total) * 100);
  }, [answers, questionSet?.questions.length]);

  if (!questionSet) {
    return null;
  }

  return (
    <main className="section-frame space-y-8 py-12">
      <div className="glass-panel rounded-lg p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">{ageGroup}</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">
              {pickLocalized(questionSet.title, locale)}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </div>
        <div className="mt-4 h-2 rounded-full bg-white/50">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {questionSet.questions.map((question) => (
          <div key={question.id} className="glass-panel rounded-lg p-6">
            <p className="eyebrow">{question.category}</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">
              {pickLocalized(question.prompt, locale)}
            </h2>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {question.scale.map((value) => {
                const active = answers[question.id] === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setAnswers((current) => ({
                        ...current,
                        [question.id]: value,
                      }))
                    }
                    className={`rounded-lg px-3 py-3 text-sm ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/70 text-muted-foreground dark:bg-white/5"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          size="lg"
          className="bg-primary text-primary-foreground"
          onClick={async () => {
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
            toast.success(locale === "th" ? "ประมวลผลแล้ว" : "Assessment complete");
            router.push(result.resultPath);
          }}
        >
          {locale === "th" ? "ดูผลลัพธ์" : "See Result"}
        </Button>
      </div>
    </main>
  );
}

export function SkillResultView({ data }: { data: SkillTestResultData }) {
  const { locale } = usePreference();

  return (
    <main className="section-frame space-y-8 py-12">
      <div className="soft-surface rounded-lg px-6 py-10">
        <p className="eyebrow">{data.ageGroup}</p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          {locale === "th" ? "ผลลัพธ์ของคุณ" : "Your result"}
        </h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          {pickLocalized(data.summary, locale)}
        </p>
      </div>

      <div className="glass-panel rounded-lg p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.chart.map((item) => (
            <div key={item.category} className="rounded-lg bg-white/60 p-4 dark:bg-white/5">
              <p className="text-sm text-muted-foreground">{item.category}</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{item.score}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href={`/skill-test/careers/${data.attemptId}`}>
          <Button className="bg-primary text-primary-foreground">
            {locale === "th" ? "Career Recommendation" : "Career Recommendation"}
          </Button>
        </Link>
        <Link href={`/skill-test/courses/${data.attemptId}`}>
          <Button variant="outline">
            {locale === "th" ? "Recommended Courses" : "Recommended Courses"}
          </Button>
        </Link>
      </div>
    </main>
  );
}

export function CareerRecommendationView({ careers }: { careers: CareerCardData[] }) {
  const { locale } = usePreference();

  return (
    <main className="section-frame space-y-8 py-12">
      <div className="soft-surface rounded-lg px-6 py-10">
        <h1 className="text-3xl font-semibold text-foreground">
          {locale === "th" ? "Career Recommendation" : "Career Recommendation"}
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {careers.map((career) => (
          <article key={career.id} className="glass-panel rounded-lg p-6">
            <p className="eyebrow">{career.matchPercentage}% match</p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground">
              {pickLocalized(career.name, locale)}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {pickLocalized(career.summary, locale)}
            </p>
            <p className="mt-4 text-sm text-foreground">{career.salaryRange}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {career.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-white/70 px-2 py-1 text-xs text-muted-foreground dark:bg-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                {locale === "th" ? "View Career Path" : "View Career Path"}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export function RecommendedCoursesView({
  courses,
}: {
  courses: Array<CourseCardData & { matchPercentage?: number }>;
}) {
  const { locale } = usePreference();

  return (
    <main className="section-frame space-y-8 py-12">
      <div className="soft-surface rounded-lg px-6 py-10">
        <h1 className="text-3xl font-semibold text-foreground">
          {locale === "th" ? "Recommended Courses" : "Recommended Courses"}
        </h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="space-y-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{course.matchPercentage ?? 80}% match</span>
              <Link
                href={`/courses/${course.slug}`}
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                {locale === "th" ? "Start Learning" : "Start Learning"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </main>
  );
}
