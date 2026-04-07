"use client";

import { useRef, useState } from "react";
import {
  PlayCircle,
  FileText,
  CheckCircle2,
  Circle,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Lesson } from "@/types/lesson/lesson.type";
import { cn } from "@/lib/utils";

export default function Video({ courseDetails }: { courseDetails: Lesson[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(),
  );
  const sliderRef = useRef<HTMLDivElement>(null);

  /* ── Empty state ── */
  if (courseDetails.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0f172a] text-white/30">
        <PlayCircle size={52} />
        <p>ยังไม่มีบทเรียนในคอร์สนี้</p>
      </div>
    );
  }

  const lesson = courseDetails[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < courseDetails.length - 1;
  const isDone = completedLessons.has(lesson.id);
  const progressPercent = Math.round(
    (completedLessons.size / courseDetails.length) * 100,
  );

  const toggleComplete = (id: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const goNext = () => {
    if (!completedLessons.has(lesson.id))
      setCompletedLessons((prev) => new Set(prev).add(lesson.id));
    if (hasNext) setCurrentIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (hasPrev) setCurrentIndex((i) => i - 1);
  };

  /* scroll slider by ~3 cards */
  const scrollSlider = (dir: "left" | "right") => {
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -480 : 480,
      behavior: "smooth",
    });
  };

  /* scroll active card into view */
  const goToLesson = (index: number) => {
    setCurrentIndex(index);
    const card = sliderRef.current?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)] w-full bg-[#0f172a]">

      {/* ══════════════════════════════════
          LEFT — player + slider
      ══════════════════════════════════ */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* ── Video / Docs ── */}
        <div className="w-full bg-black">
          {lesson.type === "VIDEO" && lesson.video ? (
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <video
                key={lesson.id}
                controls
                className="absolute inset-0 h-full w-full"
              >
                <source src={lesson.video} type="video/mp4" />
              </video>
            </div>
          ) : lesson.type === "DOCS" && lesson.docs ? (
            <div className="w-full overflow-y-auto p-8 text-white/90" style={{ maxHeight: "400px" }}>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-loose">
                {lesson.docs}
              </pre>
            </div>
          ) : (
            <div
              className="relative w-full"
              style={{ aspectRatio: "16/9" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/20">
                <PlayCircle size={56} />
                <p className="text-sm">ไม่มีเนื้อหาในบทนี้</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Controls ── */}
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-2.5">
          <button
            onClick={goPrev}
            disabled={!hasPrev}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              hasPrev
                ? "bg-white/10 text-white hover:bg-white/20"
                : "cursor-not-allowed text-white/20",
            )}
          >
            <SkipBack size={14} />
            ย้อนกลับ
          </button>

          <button
            onClick={goNext}
            disabled={!hasNext}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              hasNext
                ? "bg-cyan-500 text-white hover:bg-cyan-400"
                : "cursor-not-allowed bg-white/10 text-white/20",
            )}
          >
            ถัดไป
            <SkipForward size={14} />
          </button>

          <button
            onClick={() => toggleComplete(lesson.id)}
            className={cn(
              "ml-auto flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              isDone
                ? "bg-green-500/20 text-green-400 ring-1 ring-green-500/30"
                : "bg-white/8 text-white/50 hover:bg-white/15 hover:text-white",
            )}
          >
            {isDone ? (
              <><CheckCircle2 size={14} /> เรียนแล้ว</>
            ) : (
              <><Circle size={14} /> ทำเครื่องหมาย</>
            )}
          </button>
        </div>

        {/* ── Title ── */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-xs text-white/35">
            บทที่ {currentIndex + 1} / {courseDetails.length}
          </p>
          <h1 className="mt-0.5 text-lg font-bold text-white leading-snug">
            {lesson.title}
          </h1>
          <span
            className={cn(
              "mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
              lesson.type === "VIDEO"
                ? "bg-cyan-500/15 text-cyan-400"
                : "bg-blue-500/15 text-blue-400",
            )}
          >
            {lesson.type === "VIDEO" ? <PlayCircle size={10} /> : <FileText size={10} />}
            {lesson.type === "VIDEO" ? "วิดีโอ" : "เอกสาร"}
          </span>
        </div>

        {/* ════════════════════════════════
            SLIDER — lesson cards
        ════════════════════════════════ */}
        <div className="mt-2 px-5 pb-6">
          {/* Slider header */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={14} className="text-cyan-400" />
              <span className="text-sm font-semibold text-white/80">
                บทเรียนทั้งหมด
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/40">
                {courseDetails.length}
              </span>
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-1.5">
              <button
                onClick={() => scrollSlider("left")}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => scrollSlider("right")}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Cards row */}
          <div
            ref={sliderRef}
            className="flex gap-3 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {courseDetails.map((detail, index) => {
              const isActive = currentIndex === index;
              const done = completedLessons.has(detail.id);

              return (
                <button
                  key={detail.id}
                  onClick={() => goToLesson(index)}
                  className={cn(
                    "relative flex w-44 shrink-0 flex-col rounded-xl border p-3 text-left transition-all",
                    isActive
                      ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                      : done
                        ? "border-white/5 bg-white/5 opacity-60"
                        : "border-white/8 bg-white/5 hover:border-white/20 hover:bg-white/10",
                  )}
                >
                  {/* Card thumbnail */}
                  <div
                    className={cn(
                      "mb-2.5 flex h-20 w-full items-center justify-center rounded-lg",
                      isActive ? "bg-cyan-500/15" : "bg-black/40",
                    )}
                  >
                    {done ? (
                      <CheckCircle2
                        size={26}
                        className="text-green-400"
                      />
                    ) : detail.type === "DOCS" ? (
                      <FileText
                        size={26}
                        className={isActive ? "text-cyan-400" : "text-white/25"}
                      />
                    ) : (
                      <PlayCircle
                        size={26}
                        className={isActive ? "text-cyan-400" : "text-white/25"}
                      />
                    )}
                  </div>

                  {/* Card text */}
                  <p
                    className={cn(
                      "line-clamp-2 text-xs font-medium leading-snug",
                      isActive ? "text-cyan-300" : "text-white/65",
                    )}
                  >
                    {detail.title}
                  </p>
                  <p className="mt-1 text-xs text-white/30">
                    บทที่ {index + 1} •{" "}
                    {detail.type === "VIDEO" ? "วิดีโอ" : "เอกสาร"}
                  </p>

                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          RIGHT — Sidebar (desktop)
      ══════════════════════════════════ */}
      <div className="hidden w-72 shrink-0 flex-col border-l border-white/10 xl:flex">
        {/* Header */}
        <div className="border-b border-white/10 px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">
              เนื้อหาคอร์ส
            </span>
            <span className="text-xs text-white/40">
              {completedLessons.size}/{courseDetails.length}
            </span>
          </div>
          <div className="mt-3">
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-1 text-right text-xs text-white/30">
              {progressPercent}% สำเร็จ
            </p>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {courseDetails.map((detail, index) => {
            const isActive = currentIndex === index;
            const done = completedLessons.has(detail.id);
            return (
              <button
                key={detail.id}
                onClick={() => goToLesson(index)}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left transition-colors",
                  isActive
                    ? "border-l-2 border-l-cyan-500 bg-white/8"
                    : "hover:bg-white/5",
                )}
              >
                <div
                  className={cn(
                    "mt-0.5 flex h-9 w-14 shrink-0 items-center justify-center rounded-md",
                    isActive
                      ? "bg-cyan-500/20"
                      : done
                        ? "bg-green-500/15"
                        : "bg-white/8",
                  )}
                >
                  {done ? (
                    <CheckCircle2 size={16} className="text-green-400" />
                  ) : detail.type === "DOCS" ? (
                    <FileText
                      size={16}
                      className={isActive ? "text-cyan-400" : "text-white/30"}
                    />
                  ) : (
                    <PlayCircle
                      size={16}
                      className={isActive ? "text-cyan-400" : "text-white/30"}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "line-clamp-2 text-xs leading-snug",
                      isActive
                        ? "font-semibold text-white"
                        : done
                          ? "text-white/40 line-through"
                          : "text-white/65",
                    )}
                  >
                    {index + 1}. {detail.title}
                  </p>
                  <p className="mt-0.5 text-xs text-white/30">
                    {detail.type === "VIDEO" ? "วิดีโอ" : "เอกสาร"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
