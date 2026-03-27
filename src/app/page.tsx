import Hero from '@/components/custom/Hero';
import Stats from '@/components/custom/Stats';
import CourseList from '@/components/custom/CourseList';
import CTA from '@/components/custom/CTA';
import Footer from '@/components/custom/Footer';

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Stats />
      <CourseList />
      <CTA />
      <Footer />
    </main>
  );
}
