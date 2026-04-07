import Video from "@/components/video/video";
import { getCourseById } from "@/lib/api/course/course.service";
import { Lesson } from "@/types/lesson/lesson.type";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// TODO: ลบ mock data ออกเมื่อครูอัปโหลด lesson จริงแล้ว
const MOCK_LESSONS: Lesson[] = [
  {
    id: "mock-1",
    courseId: "mock",
    title: "บทที่ 1: แนะนำคอร์ส สร้างรายได้จาก TikTok และ Reels",
    type: "VIDEO",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    docs: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-2",
    courseId: "mock",
    title: "บทที่ 2: ทำความเข้าใจ Algorithm ของ TikTok",
    type: "VIDEO",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    docs: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-3",
    courseId: "mock",
    title: "บทที่ 3: วิธีสร้าง Content ที่ Viral",
    type: "VIDEO",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    docs: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-4",
    courseId: "mock",
    title: "บทที่ 4: การตัดต่อวิดีโอด้วย CapCut",
    type: "VIDEO",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    docs: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-5",
    courseId: "mock",
    title: "บทที่ 5: เทคนิค Hook 3 วินาทีแรก",
    type: "DOCS",
    video: null,
    docs: "เทคนิค Hook 3 วินาทีแรก\n\n1. เริ่มด้วยคำถามที่น่าสนใจ\n2. แสดงผลลัพธ์ก่อนกระบวนการ\n3. ใช้ตัวเลขหรือสถิติ\n4. สร้าง Curiosity Gap\n\nตัวอย่าง:\n- 'ทำไมคนส่วนใหญ่ถึงไม่รู้เรื่องนี้?'\n- 'ฉันสร้างรายได้ 50,000 บาทใน 30 วัน ด้วยวิธีนี้'",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-6",
    courseId: "mock",
    title: "บทที่ 6: การหาแหล่งรายได้จาก TikTok",
    type: "VIDEO",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    docs: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const metadata: Metadata = {
  title: "Lesson | Learney",
};

interface LessonPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);

  const instructorName =
    typeof course.instructor === "string"
      ? course.instructor
      : (course.instructor as { fullname?: string })?.fullname ?? "";

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-30 flex w-full items-center justify-between border-b border-white/10 bg-[#0f172a]/95 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-4">
          <Link
            href={`/course/${courseId}`}
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          >
            <ChevronLeft size={14} />
            กลับ
          </Link>

          <div className="hidden border-l border-white/15 pl-4 sm:block">
            <h2 className="text-sm font-semibold text-white leading-tight max-w-md truncate">
              {course.courseName}
            </h2>
            {instructorName && (
              <p className="text-xs text-white/40">โดย {instructorName}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/40">
          <span>{course.courseDetails?.length ?? 0} บทเรียน</span>
        </div>
      </div>

      {/* ── Video component ── */}
      <Video courseDetails={course.courseDetails?.length ? course.courseDetails : MOCK_LESSONS} />
    </div>
  );
}
