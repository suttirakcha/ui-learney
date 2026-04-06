import {
  BookOpen,
  CircleCheckBig,
  Clock2,
  Flame,
  GraduationCap,
  Trophy,
  Zap,
} from "lucide-react";

export default function OverviewPage() {
  return (
    <>
      <div>
        <div className="flex">
          <div className="flex-1 m-7">
            <h1 className="text-2xl m-2">Learning Progress</h1>

            <div className="flex justify-between">
              <div className="flex border-2 rounded-md h-20 w-40">
                <BookOpen className="text-blue-300 items-center" />
              </div>
              <div className="border-2 rounded-md h-20 w-40">
                <CircleCheckBig className="text-green-600" />
                <p></p>
              </div>
              <div className="border-2 rounded-md h-20 w-40">
                <Clock2 className="text-indigo-600" />
              </div>
              <div className="border-2 rounded-md h-20 w-40">
                <Flame />
              </div>
            </div>

            <h1 className="font-bold text-2xl p-2 m-2">Continue</h1>
            <div className="border-2 rounded-md p-2 m-2">sdksdksak</div>
            <div className="border-2 rounded-md p-2 m-2">l;dfskdsl;fks</div>
            <div className="border-2 rounded-md p-2 m-2">dslkfdlkdsldkfs</div>

            <h1 className="text-2xl m-2">Achievement & Badges</h1>
            <div className="flex justify-between">
              <div className="flex border-2 rounded-md h-20 w-40">
                <GraduationCap className="text-blue-300" />
              </div>
              <div className="flex border-2 rounded-md h-20 w-40">
                <Zap className="text-green-600" />
                <p></p>
              </div>
              <div className="flex border-2 rounded-md h-20 w-40">
                <Flame className="text-indigo-600" />
              </div>
              <div className="flex border-2 rounded-md h-20 w-40">
                <Trophy />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
