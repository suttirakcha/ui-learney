import LnButton from "@/components/custom/LnButton";
import { Progress } from "@/components/ui/progress";
import { getCourseById } from "@/lib/api/course/course.service";
import { PlayCircle } from "lucide-react";
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
      <div className="max-w-full border-b p-4 sticky top-0 bg-muted flex items-center">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <Link href={`/course/${courseId}`} className="font-semibold">
              กลับหน้าแรก
            </Link>
            <div>
              <h2 className="text-2xl font-semibold">บทเรียนภาษาอังกฤษ</h2>
              <p>โดย อาจารย์ดุ๋น</p>
            </div>
          </div>
          <div>
            <div className="font-semibold justify-end">ความคืบหน้า</div>
            <Progress className="h-2 w-20 bg-white" value={50} />
          </div>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto w-full grid grid-cols-3 gap-10">
        <div className="col-span-2 flex flex-col gap-4">
          {/* <div className="flex justify-center p-6 py-2">วาง video คอร์ส</div> */}
          <video width="full" controls className="rounded-xl">
            <source
              src="https://res.cloudinary.com/dno6w2uw6/video/upload/v1775458268/yjnucydqyo4ziam1lxnv.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="flex items-center justify-between">
            <LnButton>บทก่อนหน้า</LnButton>
            <LnButton>บทถัดไป</LnButton>
          </div>
        </div>

        <div className="border rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">เนื้อหาบทเรียน</h2>

          <div className="border rounded-lg px-4 py-2 flex items-center gap-4">
            <PlayCircle />
            <div>
              <h2 className="text-lg">Introduction to HTML</h2>
              <p className="text-muted-foreground text-sm">5:30</p>
            </div>
          </div>
          <div className="border rounded-lg px-4 py-2 flex items-center gap-4">
            <PlayCircle />
            <div>
              <h2 className="text-lg">Introduction to CSS</h2>
              <p className="text-muted-foreground text-sm">5:30</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
