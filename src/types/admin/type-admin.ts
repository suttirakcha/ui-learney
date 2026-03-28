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
