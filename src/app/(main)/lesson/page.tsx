import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lesson',
};

export default function LessonPage() {
  return (
    <>
      <div className="bg-amber-500 grid grid-cols-2  items-center h-15 max-w-full">
        <div className=" font-semibold w-500">กลับหน้าแรก</div>
        <div className="font-semibold justify-end">ความคืบหน้า</div>
      </div>

      <div className="p-6">
        <div className="flex justify-center text-3xl text-red-500 p-6">
          บทเรียนภาษาอังกฤษ
        </div>

        <div className="flex justify-center p-6 py-2">วาง video คอร์ส</div>

        <div className="flex justify-center">
          <div className="font-bold p-8 border-2 max-w-45">แนะนำคอร์ส</div>
        </div>

        <div className="w-full flex justify-end">
          <div className="grid font-bold border-2 max-w-95 p-6">
            เนื้อหาบทเรียน
          </div>
        </div>

        <div className="font-bold grid justify-end">บทถัดไป</div>
      </div>
    </>
  );
}
