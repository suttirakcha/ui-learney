export interface Promotion {
  id: string;
  slug?: string;
  title: { th: string; en?: string };
  description?: { th: string; en?: string };
  type: string;
  discount?: number;
  discountAmount?: number;
  banner?: string;
  promoCode?: string;
  code?: string;
  minimumSpend?: number;
  usageLimit?: number;
  perUserLimit?: number;
  stackable: boolean;
  scope: string;
  categoryKeys?: string[];
  instructorIds?: string[];
  startDate: string;
  endDate: string;
  active: boolean;
  courses: {
    courseId: string;
    course: {
      id: string;
      courseName: string;
    };
  }[];
}

export interface PromotionCourse {
  id: string;
  promotionId: string;
  courseId: string;
  course: {
    id: string;
    courseName: string;
  };
}
