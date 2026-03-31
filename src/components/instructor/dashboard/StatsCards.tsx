import { DashboardData } from "@/types/instructor/instructor.type";

export default function StatsCards({ data }: { data: DashboardData }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Earnings */}{" "}
      <div className=" text-black p-4 rounded-xl shadow hover:bg-blue-100">
        {" "}
        <p className="text-sm">Your Earnings</p>{" "}
        <h2 className="text-xl font-bold">
          ฿{data.totalRevenue.toLocaleString()}{" "}
        </h2>{" "}
        <p className="text-xs opacity-80">After platform fee</p>{" "}
      </div>
      {/* Sales */}
      <div className="bg-white p-4 rounded-xl shadow hover:bg-blue-100">
        <p className="text-gray-500 text-sm">Total Sales</p>
        <h2 className="text-xl font-bold">{data.totalSales}</h2>
      </div>
      {/* Courses */}
      <div className="bg-white p-4 rounded-xl shadow hover:bg-blue-100">
        <p className="text-gray-500 text-sm">Published Courses</p>
        <h2 className="text-xl font-bold">{data.totalCourses}</h2>
      </div>
      {/* Students (mock) */}
      <div className="bg-white p-4 rounded-xl shadow hover:bg-blue-100">
        <p className="text-gray-500 text-sm">Total Students</p>
        <h2 className="text-xl font-bold">
          {data.courses.reduce((sum, c) => sum + (c.students || 0), 0)}
        </h2>
      </div>
    </div>
  );
}
