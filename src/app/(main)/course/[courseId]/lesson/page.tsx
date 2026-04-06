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

  console.log("course", course);
  return (
    <>
      <div className="max-w-full border-b p-4 sticky top-0 bg-muted flex items-center">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <Link href={`/course/${courseId}`} className="font-semibold">
              กลับหน้าแรก
            </Link>
            <div>
              <h2 className="text-2xl font-semibold">{course?.courseName}</h2>
              {/* <p>โดย {("fullname"  course?.instructor) ? course?.instructor.fullName : ''}</p> */}
            </div>
          </div>
          <div>
            <div className="font-semibold justify-end">ความคืบหน้า</div>
            <Progress className="h-2 w-20 bg-white" value={50} />
          </div>
        </div>
      </div>

      {/* วาง video คอร์ส และเนื้อหาบทเรียน */}
      <Video courseDetails={course?.courseDetails || []} />
    </>
  );
}
