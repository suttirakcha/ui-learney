export type Course = {
  id: string;
  courseName: string;
  instructor: {
    fullname: string;
  };
};

export type Dashboard = {
  totalCourses: number;
  pending: number;
  approved: number;
  totalUsers: number;
};

export type CoursePerformance = {
  courseId: string;
  courseName: string;
  sales: number;
  revenue: number;
  platformFee: number;
  instructorEarn: number;
  students: number;
  rating: number;
};

export type CategoryStat = {
  name: string;
  value: number;
};
