import { Progress } from "@/components/ui/progress";
import Video from "@/components/video/video";
import { getCourseById } from "@/lib/api/course/course.service";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lesson",
};

interface LessonPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);

  return (
    <>
      <div className="sticky top-0 max-w-full border-b bg-muted p-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/course/${courseId}`} className="font-semibold">
              กลับหน้าแรก
            </Link>
            <div>
              <h2 className="text-2xl font-semibold">{course.courseName}</h2>
              <p>{course.instructor ? `โดย ${course.instructor}` : ""}</p>
            </div>
          </div>

          <div>
            <div className="justify-end font-semibold">ความคืบหน้า</div>
            <Progress className="h-2 w-20 bg-white" value={50} />
          </div>
        </div>
      </div>

      <Video courseDetails={course.courseDetails || []} />
    </>
  );
}
