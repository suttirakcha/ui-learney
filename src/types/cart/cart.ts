export type Cart = {
  readonly id: string;
  subtotal: string | number;
  total: string | number;
  discount?: string | number;
};
