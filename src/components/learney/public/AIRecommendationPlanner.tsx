"use client";

import { type KeyboardEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Sparkles,
  Target,
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/api/fetchApi";

type RecommendationResult = {
  id: string;
  aiSummary?: string | null;
  recommendations: Array<{
    id: string;
    score: number;
    reason: string;
    course: {
      id: string;
      slug?: string | null;
      courseName?: string;
      title?: { th?: string; en?: string } | null;
      description?: string | null;
      thumbnail?: string | null;
    };
  }>;
};

export function AIRecommendationPlanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [form, setForm] = useState({
    currentCareer: "",
    targetCareer: "",
    learningGoal: "",
    interests: [] as string[],
  });
  const [interestInput, setInterestInput] = useState("");

  const handleAddInterest = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && interestInput.trim()) {
      event.preventDefault();
      const normalizedValue = interestInput.trim();
      if (!form.interests.includes(normalizedValue)) {
        setForm((current) => ({
          ...current,
          interests: [...current.interests, normalizedValue],
        }));
      }
      setInterestInput("");
    }
  };

  const getCourseTitle = (
    course: RecommendationResult["recommendations"][number]["course"],
  ) => {
    return course.title?.th || course.title?.en || course.courseName || "Learney Course";
  };

  const handleSubmit = async () => {
    if (!form.targetCareer || form.interests.length === 0) {
      toast.error("กรุณาระบุเป้าหมายอาชีพและความสนใจอย่างน้อย 1 อย่าง");
      return;
    }

    setLoading(true);
    try {
      const response = (await fetchApi("/ai/recommendations/generate", {
        method: "POST",
        body: JSON.stringify(form),
      }).then((value) => value.json())) as RecommendationResult;
      setResult(response);
      toast.success("AI วิเคราะห์เส้นทางเรียนให้แล้วครับ");
    } catch (error) {
      console.error(error);
      toast.error("เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section-frame space-y-8 py-12">
      <section className="soft-surface rounded-lg px-6 py-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            AI Planner
          </div>
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
            วางแผนคอร์สที่ใช่ให้ตรงกับเป้าหมายอาชีพ
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            บอกเล่าเส้นทางที่อยากไป แล้วให้ระบบช่วยคัดคอร์สเริ่มต้นที่เหมาะกับคุณ
            พร้อมเหตุผลแบบอ่านแล้วตัดสินใจต่อได้เลย
          </p>
        </div>
      </section>

      <section className="glass-panel rounded-lg p-6 sm:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Briefcase className="h-4 w-4 text-primary" />
              อาชีพปัจจุบัน
            </span>
            <input
              type="text"
              value={form.currentCareer}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  currentCareer: event.currentTarget.value,
                }))
              }
              placeholder="เช่น นักศึกษา, นักการตลาด, โปรแกรมเมอร์"
              className="w-full rounded-xl border border-white/50 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-primary/40 dark:bg-white/5"
            />
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Target className="h-4 w-4 text-primary" />
              เป้าหมายอาชีพ
            </span>
            <input
              type="text"
              value={form.targetCareer}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  targetCareer: event.currentTarget.value,
                }))
              }
              placeholder="เช่น Data Analyst, Product Designer"
              className="w-full rounded-xl border border-white/50 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-primary/40 dark:bg-white/5"
            />
          </label>
        </div>

        <div className="mt-5 space-y-2">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            <BookOpen className="h-4 w-4 text-primary" />
            ความสนใจที่อยากต่อยอด
          </span>
          <div className="mb-3 flex flex-wrap gap-2">
            {form.interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary"
              >
                {interest}
                <button
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      interests: current.interests.filter((item) => item !== interest),
                    }))
                  }
                  className="text-primary/70 transition hover:text-primary"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={interestInput}
            onChange={(event) => setInterestInput(event.currentTarget.value)}
            onKeyDown={handleAddInterest}
            placeholder="พิมพ์แล้วกด Enter เช่น Python, UX, Strategy"
            className="w-full rounded-xl border border-white/50 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-primary/40 dark:bg-white/5"
          />
        </div>

        <label className="mt-5 block space-y-2">
          <span className="text-sm font-medium text-foreground">
            เป้าหมายการเรียนรู้แบบสั้นๆ
          </span>
          <textarea
            rows={4}
            value={form.learningGoal}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                learningGoal: event.currentTarget.value,
              }))
            }
            placeholder="เช่น อยากเปลี่ยนสายไปงานข้อมูลภายใน 6 เดือน"
            className="w-full rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-primary/40 dark:bg-white/5"
          />
        </label>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary text-primary-foreground"
          >
            {loading ? "กำลังวิเคราะห์..." : "วิเคราะห์ด้วย AI"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {result ? (
        <section className="space-y-5">
          <div className="glass-panel rounded-lg p-6">
            <p className="eyebrow">AI Summary</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              เส้นทางเริ่มต้นที่แนะนำสำหรับคุณ
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {result.aiSummary || "นี่คือคอร์สที่เหมาะกับเป้าหมายของคุณมากที่สุดในตอนนี้"}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {result.recommendations.map((item) => (
              <article key={item.id} className="glass-panel rounded-lg p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-primary">
                    {Math.round(item.score)}% match
                  </p>
                  <Link
                    href={`/courses/${item.course.slug ?? item.course.id}`}
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    ดูคอร์ส
                  </Link>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {getCourseTitle(item.course)}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {item.reason}
                </p>
                <div className="mt-5">
                  <Link href={`/courses/${item.course.slug ?? item.course.id}`}>
                    <Button variant="outline" className="w-full">
                      เปิดรายละเอียดคอร์ส
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
