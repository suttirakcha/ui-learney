import EmptyCart from '@/components/custom/cart/EmptyCart';
import Payment from '@/components/custom/cart/Payment';
import { Fragment } from 'react/jsx-runtime';
import CartItemList from '@/components/custom/cart/CartItemList';

export default function CartPage() {
  const carts = ['test'];
  return (
    <Fragment>
      {carts.length > 0 ? (
        <div className='space-y-4'>
          <h2 className='text-3xl font-bold'>ตะกร้าสินค้า (2)</h2>
          <main className='grid grid-cols-3 gap-6'>
            <section className='col-span-2'>
              <CartItemList />
            </section>
            <section>
              <Payment />
            </section>
          </main>
        </div>
      ) : (
        <EmptyCart />
      )}
    </Fragment>
  );
}
