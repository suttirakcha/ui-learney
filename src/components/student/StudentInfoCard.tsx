import { BookOpen, CircleCheckBig, Clock2, Flame } from 'lucide-react';

export default function StudentInfoCard() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="rounded-md border-2 bg-background p-4 flex justify-between">
        <div>
          <h4 className="text-accent-foreground">หลักสูตรที่ลงเรียน</h4>
          <p className="text-xl font-semibold">3</p>
        </div>
        <BookOpen className="text-blue-400" />
      </div>

      <div className="rounded-md border-2 bg-background p-4 flex justify-between">
        <div>
          <h4 className="text-accent-foreground">สำเร็จหลักสูตร</h4>
          <p className="text-xl font-semibold">8</p>
        </div>
        <CircleCheckBig className="text-green-400" />
      </div>

      <div className="rounded-md border-2 bg-background p-4 flex justify-between">
        <div>
          <h4 className="text-accent-foreground">ชั่วโมงเรียนทั้งหมด</h4>
          <p className="text-xl font-semibold">142</p>
        </div>
        <Clock2 className="text-blue-400" />
      </div>

      <div className="rounded-md border-2  bg-background p-4 flex justify-between">
        <div>
          <h4 className="text-accent-foreground">จำนวนวันที่เรียนติดต่อกัน</h4>
          <p className="text-xl font-semibold">12</p>
        </div>
        <Flame className="text-red-500" />
      </div>
    </div>
  );
}
