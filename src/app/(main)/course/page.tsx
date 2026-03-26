import CourseListing from "@/components/course/course-listing";

export const metadata = {
  title: "คอร์สเรียนทั้งหมด",
  description: "ค้นพบคอร์สเรียนที่หลากหลาย และเริ่มต้นเรียนรู้ได้แล้ววันนี้",
};

export default function CoursesPage() {
  return (
    <main>
      <CourseListing />
    </main>
  );
}
