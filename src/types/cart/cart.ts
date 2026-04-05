export type Cart = {
  readonly id: string;
  readonly userId?: string;
  subtotal: string | number;
  total: string | number;
  discount?: string | number;
};
