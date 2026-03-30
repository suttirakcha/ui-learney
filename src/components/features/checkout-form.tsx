'use client';

import { useForm } from 'react-hook-form';
import LnInput from '../custom/LnInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutProps, CheckoutValues } from '@/schemas/checkout.schema';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
};

export default function CheckoutForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: initialValues,
    // resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (values: CheckoutValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-1'>
          <label className='block text-sm font-medium'>First name</label>
          <LnInput
            {...register('firstName')}
            placeholder='Enter your first name'
          />
        </div>
        <div className='space-y-1'>
          <label className='block text-sm font-medium'>Last name</label>
          <LnInput
            {...register('lastName')}
            placeholder='Enter your last name'
          />
        </div>
      </div>

      <div className='space-y-1'>
        <label className='block text-sm font-medium'>Email</label>
        <LnInput {...register('email')} placeholder='Enter your email' />
      </div>

      <div className='space-y-1'>
        <label className='block text-sm font-medium'>Address</label>
        <LnInput {...register('address')} placeholder='Enter your address' />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-1'>
          <label className='block text-sm font-medium'>City</label>
          <LnInput {...register('city')} placeholder='Enter your city' />
        </div>
        <div className='space-y-1'>
          <label className='block text-sm font-medium'>Postal code</label>
          <LnInput
            {...register('postalCode')}
            placeholder='Enter your postal code'
          />
        </div>
      </div>
    </form>
  );
}
