import Hero from "@/components/custom/Hero";
import Stats from "@/components/custom/Stats";

import CTA from "@/components/custom/CTA";

import CourseListing from "@/components/course/cards/course-listing";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Stats />
      <CourseListing />

      <CTA />
    </main>
  );
}
