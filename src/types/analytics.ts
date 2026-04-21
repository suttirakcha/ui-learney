export interface CategorySummary {
  name: string;
}

export interface EnrollmentChartData {
  createdAt: Date;
  _count: {
    id: number;
  };
}

export interface AnalyticsData {
  enrollmentChart: EnrollmentChartData[];
  avgCompletion: number;
  totalRevenue: number;
  studentEngagement: Array<{
    label: string;
    value: number;
  }>;
}

export interface CourseStat {
  courseId: string;
  courseName: string;
  sales: number;
  revenue: number;
  students: number;
  rating: number;
  category?: CategorySummary;
}
