"use client";

import { PlayCircle } from "lucide-react";
import LnButton from "../custom/LnButton";
import { Lesson } from "@/types/lesson/lesson.type";
import { useState } from "react";

export default function Video({ courseDetails }: { courseDetails: Lesson[] }) {
  const [lesson, setLesson] = useState<Lesson | undefined>(courseDetails[0]);

  if (!lesson) {
    return <div>ไม่มีบทเรียน</div>;
  }
  return (
    <div className="p-8 max-w-7xl mx-auto w-full grid grid-cols-3 gap-10">
      <div className="col-span-2 flex flex-col gap-4">
        {/* <div className="flex justify-center p-6 py-2">วาง video คอร์ส</div> */}
        {lesson?.video && (
          <video key={lesson.id} controls className="rounded-xl w-full">
            <source src={lesson.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="flex items-center justify-between">
          <LnButton>บทก่อนหน้า</LnButton>
          <LnButton>บทถัดไป</LnButton>
        </div>
      </div>

      <div className="border rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">เนื้อหาบทเรียน</h2>
        <p>{lesson?.title}</p>

        {courseDetails.map((detail) => (
          <div
            className="border rounded-lg px-4 py-2 flex items-center gap-4"
            key={detail.id}
            onClick={() => setLesson(detail)}
          >
            <PlayCircle />
            <div>
              <h2 className="text-lg">{detail.title}</h2>
              <p className="text-muted-foreground text-sm">5:30</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
