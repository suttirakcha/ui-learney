'use client';

import CheckoutForm from '@/components/features/checkout-form';
import { Fragment } from 'react';

export default function CheckoutPage() {
  return (
    <Fragment>
      <div className='bg-primary px-8 py-16'>
        <div className='max-w-7xl w-full mx-auto'>
          <h2 className='text-5xl font-medium text-white'>ชำระเงิน</h2>
        </div>
      </div>
      <div className='p-8'>
        <div className='max-w-7xl w-full mx-auto'>
          <CheckoutForm />
        </div>
      </div>
    </Fragment>
  );
}
