import EmptyCart from '@/components/cart/EmptyCart';
import { Fragment } from 'react/jsx-runtime';
import CartItemList from '@/components/cart/CartItemList';
import OrderSummary from '@/components/cart/OrderSummary';
import { useTranslations } from 'next-intl';

/* TODO: Fetch the dynamic cart item */
const carts = [
  {
    id: '1',
    courseName: 'Web Development for Beginners',
    instructor: 'Dr. Jennie Sans',
    price: 2000,
  },
  {
    id: '2',
    courseName: 'วิธีใช้ AI อย่างมีคุณภาพ',
    instructor: 'เขต ดุ๋น',
    price: 150,
  },
  {
    id: '3',
    courseName: 'English for Beginners',
    instructor: 'Mrmark',
    price: 2999,
  },
];

export default function CartPage() {
  const t = useTranslations("pages.cart");

  return (
    <Fragment>
      <div className='bg-primary px-8 py-12'>
        <h2 className='text-4xl font-medium text-white'>
          {t("title")} ({carts.length ?? 0})
        </h2>
      </div>
      <div className='p-8'>
        {carts.length ? (
          <main className='grid grid-cols-3 gap-6'>
            <section className='col-span-2'>
              <CartItemList courses={carts} />
            </section>
            <section>
              <OrderSummary />
            </section>
          </main>
        ) : (
          <EmptyCart />
        )}
      </div>
    </Fragment>
  );
}
