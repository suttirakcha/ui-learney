"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  PlayCircle,
  FileText,
  Trash2,
  Plus,
  ChevronLeft,
  Upload,
  Loader2,
} from "lucide-react";
import { Lesson, LessonType } from "@/types/lesson/lesson.type";
import {
  getLessonsByCourse,
  createLesson,
  deleteLesson,
} from "@/lib/api/lesson/lesson.service";
import { cn } from "@/lib/utils";

export default function InstructorLessonsPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const router = useRouter();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [title, setTitle] = useState("");
  const [type, setType] = useState<LessonType>("VIDEO");
  const [docs, setDocs] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getLessonsByCourse(courseId)
      .then(setLessons)
      .catch(() => toast.error("โหลดบทเรียนไม่สำเร็จ"))
      .finally(() => setLoading(false));
  }, [courseId]);

  const handleAddLesson = async () => {
    if (!title.trim()) {
      toast.error("กรุณาใส่ชื่อบทเรียน");
      return;
    }
    if (type === "VIDEO" && !videoFile) {
      toast.error("กรุณาเลือกไฟล์วิดีโอ");
      return;
    }
    if (type === "DOCS" && !docs.trim()) {
      toast.error("กรุณาใส่เนื้อหาเอกสาร");
      return;
    }

    try {
      setSubmitting(true);
      toast.loading("กำลังอัปโหลด...", { id: "upload" });

      const lesson = await createLesson(
        courseId,
        { title: title.trim(), type, docs: type === "DOCS" ? docs : undefined },
        type === "VIDEO" ? (videoFile ?? undefined) : undefined,
      );

      setLessons((prev) => [...prev, lesson]);
      setTitle("");
      setDocs("");
      setVideoFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success("เพิ่มบทเรียนสำเร็จ!", { id: "upload" });
    } catch {
      toast.error("เพิ่มบทเรียนไม่สำเร็จ", { id: "upload" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (lessonId: string) => {
    if (!confirm("ต้องการลบบทเรียนนี้?")) return;
    try {
      await deleteLesson(courseId, lessonId);
      setLessons((prev) => prev.filter((l) => l.id !== lessonId));
      toast.success("ลบบทเรียนแล้ว");
    } catch {
      toast.error("ลบไม่สำเร็จ");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/instructor/dashboard"
            className="flex items-center gap-1 text-sm text-cyan-600 hover:underline"
          >
            <ChevronLeft size={16} />
            กลับ Dashboard
          </Link>
        </div>

        <div>
          <h1 className="text-2xl font-bold">จัดการบทเรียน</h1>
          <p className="text-sm text-gray-500">
            เพิ่ม แก้ไข หรือลบบทเรียนในคอร์สนี้
          </p>
        </div>

        {/* ===== EXISTING LESSONS ===== */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            บทเรียนทั้งหมด ({lessons.length})
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-8 text-gray-400">
              <Loader2 className="animate-spin" size={24} />
            </div>
          ) : lessons.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-200 py-10 text-center text-gray-400">
              <PlayCircle size={36} className="mx-auto mb-2 opacity-30" />
              <p>ยังไม่มีบทเรียน เพิ่มบทเรียนแรกด้านล่าง</p>
            </div>
          ) : (
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 rounded-lg border bg-gray-50 px-4 py-3"
                >
                  <span className="w-6 shrink-0 text-center text-sm text-gray-400">
                    {index + 1}
                  </span>

                  {lesson.type === "DOCS" ? (
                    <FileText size={18} className="shrink-0 text-blue-500" />
                  ) : (
                    <PlayCircle size={18} className="shrink-0 text-cyan-500" />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{lesson.title}</p>
                    <p className="text-xs text-gray-400">
                      {lesson.type === "VIDEO" ? "วิดีโอ" : "เอกสาร"}
                    </p>
                  </div>

                  {lesson.type === "VIDEO" && lesson.video && (
                    <a
                      href={lesson.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs text-cyan-600 hover:underline"
                    >
                      ดูวิดีโอ
                    </a>
                  )}

                  <button
                    onClick={() => handleDelete(lesson.id)}
                    className="shrink-0 rounded p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== ADD LESSON FORM ===== */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
            <Plus size={20} className="text-cyan-500" />
            เพิ่มบทเรียนใหม่
          </h2>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                ชื่อบทเรียน <span className="text-red-500">*</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="เช่น บทที่ 1: แนะนำคอร์ส"
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Type selector */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                ประเภทบทเรียน
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setType("VIDEO")}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors",
                    type === "VIDEO"
                      ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50",
                  )}
                >
                  <PlayCircle size={16} />
                  วิดีโอ
                </button>
                <button
                  onClick={() => setType("DOCS")}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors",
                    type === "DOCS"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50",
                  )}
                >
                  <FileText size={16} />
                  เอกสาร
                </button>
              </div>
            </div>

            {/* Video upload */}
            {type === "VIDEO" && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  ไฟล์วิดีโอ <span className="text-red-500">*</span>
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors hover:bg-gray-50",
                    videoFile ? "border-cyan-400 bg-cyan-50" : "border-gray-200",
                  )}
                >
                  <Upload
                    size={24}
                    className={cn(
                      "mx-auto mb-2",
                      videoFile ? "text-cyan-500" : "text-gray-300",
                    )}
                  />
                  {videoFile ? (
                    <p className="text-sm text-cyan-700 font-medium">
                      {videoFile.name}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">
                      คลิกเพื่อเลือกไฟล์ MP4, MOV
                    </p>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                />
              </div>
            )}

            {/* Docs textarea */}
            {type === "DOCS" && (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  เนื้อหาเอกสาร <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={docs}
                  onChange={(e) => setDocs(e.target.value)}
                  rows={8}
                  placeholder="เขียนเนื้อหาบทเรียนที่นี่..."
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-400 focus:outline-none resize-y"
                />
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleAddLesson}
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-600 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  กำลังอัปโหลด...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  เพิ่มบทเรียน
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview link */}
        <div className="rounded-xl border border-dashed border-cyan-300 bg-cyan-50 p-4 text-center">
          <p className="text-sm text-cyan-700">
            เมื่อเพิ่มบทเรียนแล้ว นักเรียนสามารถดูได้ที่{" "}
            <Link
              href={`/course/${courseId}/lesson`}
              className="font-semibold underline"
            >
              หน้าเรียน
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
