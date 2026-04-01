import z from 'zod';

// export const checkoutSchema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   email: z.email(),
//   address: z.string(),
//   city: z.string(),
//   postalCode: z.string(),
// });

// export type CheckoutValues = z.infer<typeof checkoutSchema>;
export type CheckoutValues = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
};
export type CheckoutProps = {
  onSubmit: (values: CheckoutValues) => void;
};
