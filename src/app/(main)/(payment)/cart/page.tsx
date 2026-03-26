import EmptyCart from '@/components/custom/cart/EmptyCart';
import { Fragment } from 'react/jsx-runtime';
import CartItemList from '@/components/custom/cart/CartItemList';
import OrderSummary from '@/components/custom/cart/OrderSummary';

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
  return (
    <Fragment>
      <div className='bg-primary px-8 py-12'>
        <h2 className='text-4xl font-medium text-white'>
          ตะกร้าสินค้า ({carts.length ?? 0})
        </h2>
      </div>
      <div className='p-8'>
        {carts.length ? (
          <div className='space-y-4'>
            <main className='grid grid-cols-3 gap-6'>
              <section className='col-span-2'>
                <CartItemList courses={carts} />
              </section>
              <section>
                <OrderSummary />
              </section>
            </main>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </Fragment>
  );
}
