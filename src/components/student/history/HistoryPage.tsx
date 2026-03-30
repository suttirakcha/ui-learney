import {
  BookOpen,
  CircleCheckBig,
  Clock2,
  Flame,
  LogOut,
  Settings,
  User,
} from 'lucide-react';

export default function HistoryPage() {
  return (
    <>
      <div>
        <div className="bg-blue-400 h-25 text-white m-3 p-6">
          test
          <h1>สมชาย นักเรียน</h1>
          <p>student@leaney.com</p>
        </div>

        {/* {sidebar} */}
        <div className="flex">
          <div className="border-2 rounded-md m-6 max-w-50">
            <button className="flex items-center p-2 m-4 gap-2">
              <User />
              <p>Overview</p>
            </button>
            <button className="flex items-center p-2 m-4 gap-2">
              <BookOpen />
              <p>Course history</p>
            </button>
            <button className="flex items-center p-2 m-4 gap-2">
              <Settings />
              <p>Setting</p>
            </button>
            <button className="flex items-center p-2 m-4 gap-2">
              <LogOut />
              <p>Logout</p>
            </button>
          </div>

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

            <h1 className="font-bold text-2xl p-2 m-2">Course history</h1>
            <div className="border-2 rounded-md p-2 m-2">sdksdksak</div>
            <div className="border-2 rounded-md p-2 m-2">l;dfskdsl;fks</div>
            <div className="border-2 rounded-md p-2 m-2">dslkfdlkdsldkfs</div>
          </div>
        </div>
      </div>
    </>
  );
}
