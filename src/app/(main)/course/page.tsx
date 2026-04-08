import CourseListing from "@/components/course/cards/course-listing";
import { getCourses } from "@/lib/api/course/course.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "คอร์สเรียนทั้งหมด",
  description: "ค้นพบคอร์สเรียนที่หลากหลาย และเริ่มต้นเรียนรู้ได้แล้ววันนี้",
};

interface CoursesPageProps {
  searchParams: Promise<{ category: string }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const { category } = await searchParams;
  const courses = await getCourses(category);

  return (
    <main>
      <CourseListing showHeader courses={courses} category={category} />
    </main>
  );
}
