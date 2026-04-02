import Hero from "@/components/custom/Hero";
import Stats from "@/components/custom/Stats";

import CTA from "@/components/custom/CTA";

import CourseListing from "@/components/course/cards/course-listing";
import { getCourses } from "@/lib/api/course/course.service";
import { Suspense } from "react";
import LoadingDots from "@/components/custom/LoadingDots";

export default async function HomePage() {
  const courses = await getCourses();
  return (
    <main className="flex flex-col">
      <Hero />
      <Stats />
      <Suspense fallback={<LoadingDots />}>
        <CourseListing courses={courses} />
      </Suspense>

      <CTA />
    </main>
  );
}
