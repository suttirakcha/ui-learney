"use client";

import { CheckCircle, CirclePlay, Clock, Dot, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Course } from "@/types/course";

interface CourseDetailsPageProps {
  course: Course;
}

export default function CourseDetailsPage({ course }: CourseDetailsPageProps) {
  const {
    courseName,
    description,
    rating,
    duration,
    willLearnMessages,
    thumbnail,
    price,
    requirements,
  } = course;
  return (
    <div className="space-y-4">
      {/* HERO */}
      <div className="bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/course" className="text-blue-400 text-sm">
              ← Back to courses
            </Link>

            <h1 className="text-4xl font-bold">{courseName}</h1>

            <p className="text-gray-300">{description}</p>

            {/* INFO */}
            <div className="flex gap-6 text-sm mt-4">
              <div className="flex items-center gap-1">
                <Star className="fill-yellow-400 text-yellow-400" size={16} />
                {rating}
              </div>

              <div className="flex items-center gap-1">
                <Clock size={16} />
                {duration}
              </div>

              <div className="flex items-center gap-1">
                <CirclePlay size={16} />
                {/* {course.lessons?.length || 0} lessons */}
                {0} lessons
              </div>
            </div>
          </div>

          {/* RIGHT (CARD) */}
          <div className="bg-white text-black rounded-xl shadow-lg overflow-hidden">
            <Image
              src={thumbnail}
              alt={courseName ?? "course-image"}
              width={600}
              height={350}
              className="w-full h-48 object-cover"
              priority
            />

            <div className="p-4 space-y-4">
              <div className="text-2xl font-bold">{price}</div>

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
      </div>

      {/* LESSONS */}
      <div className="py-10 max-w-7xl mx-auto w-full">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-bold mb-4">Course Content</h2>

          {/* {course.lessons?.map((lesson) => (
            <div key={lesson.id} className="border-b py-3 flex justify-between">
              <span>{lesson.title}</span>
              <span className="text-gray-400 text-sm">{lesson.content}</span>
            </div>
          ))} */}
        </div>
      </div>

      <div className="border p-6 rounded-xl max-w-7xl mx-auto w-full space-y-4">
        <h2 className="text-2xl">What you&apos;ll learn</h2>
        <div className="flex flex-col gap-2">
          {willLearnMessages?.map((message, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle />
              <p>{message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border p-6 rounded-xl max-w-7xl mx-auto w-full space-y-4">
        <h2 className="text-2xl">Requirements</h2>
        <div className="flex flex-col gap-2">
          {requirements.length ? (
            <>
              {requirements?.map((message, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Dot />
                  <p>{message}</p>
                </div>
              ))}
            </>
          ) : (
            <p className="text-muted-foreground">
              There are no requirements for this course
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
