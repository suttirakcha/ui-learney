import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lesson',
};

export default function LessonPage() {
  return (
    <div className="min-h-screen p-2">
      <div className="flex justify-center text-3xl text-red-500 ">
        บทเรียนภาษาอังกฤษ
      </div>
      <h1 className="font-bold p-6">ความคืบหน้าของบทเรียน</h1>
      <div>วาง video คอร์ส</div>
      แนะนำคอร์ส
      <div></div>
      <div className="font-semibold p-6">
        <div>เนื้อหาบทถัดไป</div>
      </div>
    </div>
  );
}
