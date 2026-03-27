import { CircleCheck, CirclePlay, Clock, Dot, Star } from 'lucide-react';

export default function CourseDetailsPage() {
  return (
    <>
      <div className="bg-amber-950 border-2 rounded-lg h-55 m-2">
        <button className="text-blue-800 font-bold p-3">Back to courses</button>
        <div className="grid grid-cols-3 max-w-full">
          <div className="grid items-center text-white col-span-2">
            คณิตศาตร์เริ่มต้น
          </div>
          <div className="grid bg-red-300 col-span-1 border-2 justify-end items-end">
            test
          </div>
          <p className="text-white p-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
        </div>

        <div className="grid grid-cols-3">
          <div className="flex flex-between">
            <Star className="fill-yellow-300 col-span-1" />
            <p className="text-white text-center gap-2"> 4.8</p>
          </div>
          <div className="flex flex-between gap-2">
            <Clock />
            <p className="text-white gap-2"> 20 ชั่วโมง</p>
          </div>
          <div className="flex flex-between gap-2">
            <CirclePlay />
            <p className="text-white gap-2"> 2 บทเรียน</p>
          </div>
        </div>
      </div>

      {/* {what will your learn} */}
      <div className="flex-col border-2 rounded-lg h-55 m-2">
        <h1 className="p-2">ได้อะไรจากคอร์สเรียนนี้</h1>
        <div className="flex gap-2 p-2">
          <CircleCheck className="text-green-400" />
          <p>ไม่มีพื้นฐานก็เรียนได้</p>
        </div>

        <div className="flex gap-2 p-2">
          <CircleCheck className="text-green-400" />
          <p>เข้าใจง่าย</p>
        </div>

        <div className="flex gap-2 p-2">
          <CircleCheck className="text-green-400" />
          <p>สามารถทบทวนได้ตลอด</p>
        </div>
      </div>

      <div className="flex-col border-2 rounded-lg h-35 m-2">
        <h1 className="p-2">สิ่งที่นักเรียนต้องเตรียม</h1>
        <div className="flex gap-2 p-2">
          <Dot />
          <p>คอมพิวเตอร์พกพา</p>
        </div>

        <div className="flex gap-2 p-2">
          <Dot />
          <p>เอกสารประกอบการเรียน</p>
        </div>
      </div>

      <div className="border-2 rounded-lg h-65 m-2">
        <h1 className="p-2">บทเรียนของคอร์สนี้</h1>
        <CircleCheck className="text-green-400" />
        <p>lesson 1</p>
        <p>แนะนำรายละเอียดและเนื้อหาของวิชา</p>

        <CircleCheck className="text-green-400" />
        <p>lesson 2</p>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
      </div>
    </>
  );
}
