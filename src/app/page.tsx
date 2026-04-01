import Hero from "@/components/custom/Hero";
import Stats from "@/components/custom/Stats";

import CTA from "@/components/custom/CTA";

import CourseList from "@/components/custom/CourseList";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Stats />
      <CourseList />

      <CTA />
    </main>
  );
}
