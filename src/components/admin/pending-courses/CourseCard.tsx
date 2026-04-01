"use client";

import { Course } from "@/types/course";
import { Button } from "@/components/ui/button";

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
            คอร์สใหม่
          </span>

          <h2 className="text-xl font-semibold">{course.courseName}</h2>

          <p className="text-sm text-gray-500">
            {course.instructor} • {course.category}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">ราคา</p>
          <p className="text-2xl font-bold text-blue-600">
            ฿{course.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600">{course.description}</p>

      {/* REVENUE */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
        <p className="text-xs text-blue-500">รายได้แพลตฟอร์ม (15%)</p>
        <p className="text-lg font-semibold text-blue-700">
          ฿{(course.price * 0.15).toLocaleString()}
        </p>
      </div>

      {/* BUTTON */}
      <div className="flex gap-3 pt-2">
        <Button className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl">
          อนุมัติ
        </Button>

        <Button
          variant="outline"
          className="flex-1 border-red-500 text-red-500 hover:bg-red-50 rounded-xl"
        >
          ปฏิเสธ
        </Button>
      </div>
    </div>
  );
}
