"use client";

import { useEffect, useState } from "react";
import { CirclePlay, Clock, Star } from "lucide-react";
import { CourseDetail } from "@/types/conse/type-course-detail";
import { getCourseById } from "@/lib/api/course/course.service";
import Link from "next/link";
import Image from "next/image";

export default function CourseDetailsPage({ courseId }: { courseId: string }) {
  const [course, setCourse] = useState<CourseDetail | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div className="p-10 text-center">กำลังโหลด...</div>;
  }

  return (
    <div className="bg-[#0f172a] text-white">
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/course" className="text-blue-400 text-sm">
            ← Back to courses
          </Link>

          <h1 className="text-4xl font-bold">{course.title}</h1>

          <p className="text-gray-300">{course.description}</p>

          {/* INFO */}
          <div className="flex gap-6 text-sm mt-4">
            <div className="flex items-center gap-1">
              <Star className="fill-yellow-400 text-yellow-400" size={16} />
              {course.rating}
            </div>

            <div className="flex items-center gap-1">
              <Clock size={16} />
              {course.duration}
            </div>

            <div className="flex items-center gap-1">
              <CirclePlay size={16} />
              {course.lessons?.length || 0} lessons
            </div>
          </div>
        </div>

        {/* RIGHT (CARD) */}
        <div className="bg-white text-black rounded-xl shadow-lg overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            width={600}
            height={350}
            className="w-full h-48 object-cover"
            priority
          />

          <div className="p-4 space-y-4">
            <div className="text-2xl font-bold">{course.price}</div>

            <button className="w-full bg-cyan-500 text-white py-2 rounded-lg font-semibold hover:bg-cyan-600">
              Enroll Now
            </button>

            <button className="w-full border py-2 rounded-lg text-gray-600">
              Add to Wishlist
            </button>

            <div className="text-sm text-gray-500 space-y-1 pt-2">
              <p>✔ Certificate of completion</p>
              <p>✔ Lifetime access</p>
              <p>✔ 30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* LESSONS */}
      <div className="bg-white text-black py-10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-bold mb-4">Course Content</h2>

          {course.lessons?.map((lesson) => (
            <div key={lesson.id} className="border-b py-3 flex justify-between">
              <span>{lesson.title}</span>
              <span className="text-gray-400 text-sm">{lesson.content}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
