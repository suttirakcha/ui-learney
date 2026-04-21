"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pickLocalized } from "@/lib/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import type { LocalizedText } from "@/types/learney";

export type AssessmentStepperQuestion = {
  id: string;
  category: string;
  categoryLabel?: string;
  prompt: LocalizedText;
  scale: number[];
};

const scaleLabels = {
  th: {
    1: "น้อยที่สุด",
    2: "ค่อนข้างน้อย",
    3: "ปานกลาง",
    4: "ค่อนข้างมาก",
    5: "มากที่สุด",
  },
  en: {
    1: "Very low",
    2: "Low",
    3: "Neutral",
    4: "High",
    5: "Very high",
  },
} as const;

type AssessmentStepperProps = {
  eyebrow?: string;
  title: LocalizedText;
  questions: AssessmentStepperQuestion[];
  onSubmit: (answers: Record<string, number>) => Promise<void> | void;
  onExit?: () => void;
  isSubmitting?: boolean;
};

export function AssessmentStepper({
  eyebrow,
  title,
  questions,
  onSubmit,
  onExit,
  isSubmitting = false,
}: AssessmentStepperProps) {
  const { locale } = usePreference();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const currentQuestion = questions[currentStep];
  const totalQuestions = questions.length;
  const progress = useMemo(
    () => Math.round(((currentStep + 1) / Math.max(totalQuestions, 1)) * 100),
    [currentStep, totalQuestions],
  );

  if (!currentQuestion) {
    return (
      <div className="glass-panel rounded-3xl p-6 text-center text-muted-foreground">
        {locale === "th" ? "ยังไม่มีคำถามในตอนนี้" : "No questions available right now."}
      </div>
    );
  }

  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;
  const isLastStep = currentStep === totalQuestions - 1;

  const handleNext = async () => {
    if (!hasAnsweredCurrent || isSubmitting) {
      return;
    }

    if (isLastStep) {
      await onSubmit(answers);
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, totalQuestions - 1));
  };

  return (
    <section className="space-y-6">
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              {locale === "th"
                ? `ข้อที่ ${currentStep + 1} จาก ${totalQuestions}`
                : `Question ${currentStep + 1} of ${totalQuestions}`}
            </div>
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
              {pickLocalized(title, locale)}
            </h1>
          </div>

          <div className="rounded-2xl bg-white/70 px-4 py-3 text-right dark:bg-white/5">
            <p className="text-xs text-muted-foreground">
              {locale === "th" ? "ความคืบหน้า" : "Progress"}
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{progress}%</p>
          </div>
        </div>

        <div className="mt-5 h-2 rounded-full bg-white/50">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="soft-surface rounded-3xl p-6 sm:p-8">
        <div className="space-y-3">
          <p className="eyebrow">{currentQuestion.categoryLabel ?? currentQuestion.category}</p>
          <h2 className="text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
            {pickLocalized(currentQuestion.prompt, locale)}
          </h2>
          <p className="text-sm text-muted-foreground">
            {locale === "th"
              ? "เลือกค่าที่ใกล้กับตัวคุณมากที่สุด"
              : "Choose the option that feels closest to you."}
          </p>
        </div>

        <div className="mt-6 grid gap-3">
          {currentQuestion.scale.map((value) => {
            const isSelected = answers[currentQuestion.id] === value;
            const label = scaleLabels[locale][value as keyof (typeof scaleLabels)["th"]];

            return (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setAnswers((current) => ({
                    ...current,
                    [currentQuestion.id]: value,
                  }))
                }
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-white/60 bg-white/70 hover:border-primary/40 hover:bg-white dark:border-white/10 dark:bg-white/5",
                )}
              >
                <div>
                  <p className="font-medium text-foreground">{label ?? value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {locale === "th" ? `คะแนนระดับ ${value}` : `Level ${value}`}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground",
                  )}
                >
                  {isSelected ? <Check className="h-4 w-4" /> : value}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          {onExit ? (
            <Button type="button" variant="ghost" onClick={onExit} disabled={isSubmitting}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {locale === "th" ? "กลับไปเลือกช่วงวัย" : "Back to age groups"}
            </Button>
          ) : null}
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep((step) => Math.max(step - 1, 0))}
            disabled={currentStep === 0 || isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {locale === "th" ? "ย้อนกลับ" : "Previous"}
          </Button>
        </div>

        <Button
          type="button"
          size="lg"
          className="min-w-40 bg-primary text-primary-foreground"
          onClick={handleNext}
          disabled={!hasAnsweredCurrent || isSubmitting}
        >
          {isLastStep
            ? locale === "th"
              ? "ดูผลลัพธ์"
              : "See result"
            : locale === "th"
              ? "ไปต่อ"
              : "Next"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
