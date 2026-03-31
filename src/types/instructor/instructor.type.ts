export type CourseStat = {
  courseId: string;
  courseName: string;
  sales: number;
  revenue: number;
  students: number;
  rating: number;
};

export type DashboardData = {
  totalRevenue: number;
  platformFee: number;
  totalSales: number;
  totalCourses: number;

  // 🔥 เพิ่มอันนี้
  courses: CourseStat[];
};
