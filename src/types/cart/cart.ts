export type Cart = {
  readonly id: string;
  readonly userId?: string;
  subtotal: string | number;
  total: string | number;
  discount?: string | number | null;
  appliedPromotionId?: string | null;
  appliedPromotionCode?: string | null;
};

export type CartCourse = {
  id: string;
  slug?: string | null;
  courseName: string;
  title?: {
    th?: string;
    en?: string;
  } | null;
  shortDescription?: {
    th?: string;
    en?: string;
  } | null;
  description?: {
    th?: string;
    en?: string;
  } | null;
  category?: string;
  thumbnail?: string | null;
  coverImage?: string | null;
  price: string | number;
  discountPrice?: string | number | null;
  instructor?: string;
};

export type CurrentCartResponse = {
  cart: Cart;
  courses: CartCourse[];
};
