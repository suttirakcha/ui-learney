import { CheckCircle, Flame, GraduationCap, Trophy, Zap } from "lucide-react";

export default function AchieveMentCard() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="rounded-lg border-2 bg-cyan-100 p-4">
        <div className=" flex flex-col justify-center items-center gap-2">
          <GraduationCap className="text-blue-400" />
          <h3 className="text-accent-foreground">จบหลักสูตร 1 ครั้ง</h3>
          <CheckCircle className="text-green-400" />
        </div>
      </div>

      <div className="rounded-lg border-2 bg-cyan-100 p-4 ">
        <div className="flex flex-col justify-center items-center gap-2">
          <Zap className="text-yellow-400" />
          <h3 className="text-accent-foreground">เรียนรู้ไว</h3>
          <CheckCircle className="text-green-400" />
        </div>
      </div>

      <div className="rounded-lg border-2 bg-cyan-100 p-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <Flame className="text-blue-400" />
          <h3 className="text-accent-foreground">นักรบประจำสัปดาห์</h3>
          <CheckCircle className="text-green-400" />
        </div>
      </div>

      <div className="rounded-lg border-2 bg-gray-100 p-4 ">
        <div className="flex flex-col justify-center items-center gap-2">
          <Trophy className="text-blue-400" />
          <h3 className="text-accent-foreground">ความเชี่ยวชาญระดับสูง</h3>
          <CheckCircle className="text-green-400" />
        </div>
      </div>
    </div>
  );
}
