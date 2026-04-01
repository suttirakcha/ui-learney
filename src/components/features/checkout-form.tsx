'use client';

import { useForm } from 'react-hook-form';
import LnInput from '../custom/LnInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutValues } from '@/schemas/checkout.schema';
import LnButton from '../custom/LnButton';
import LnTabs from '../custom/LnTabs';
import PaymentMethodTabs from '../checkout/PaymentMethodTabs';

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
  });

  const onSubmit = (values: CheckoutValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <main className='grid grid-cols-3 gap-6'>
        <div className='space-y-4 col-span-2'>
          <section className='space-y-4 border rounded-xl p-6'>
            <h2 className='font-semibold text-2xl'>ข้อมูลการชำระเงิน</h2>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <label className='block text-sm font-medium'>ชื่อ</label>
                <LnInput {...register('firstName')} placeholder='ใส่ชื่อ' />
              </div>
              <div className='space-y-1'>
                <label className='block text-sm font-medium'>นามสกุล</label>
                <LnInput {...register('lastName')} placeholder='ใส่นามสกุล' />
              </div>
            </div>

            <div className='space-y-1'>
              <label className='block text-sm font-medium'>อีเมล</label>
              <LnInput {...register('email')} placeholder='ใส่อีเมล' />
            </div>

            <div className='space-y-1'>
              <label className='block text-sm font-medium'>ที่อยู่</label>
              <LnInput {...register('address')} placeholder='ใส่ที่อยู่' />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <label className='block text-sm font-medium'>เมือง</label>
                <LnInput {...register('city')} placeholder='ใส่เมือง' />
              </div>
              <div className='space-y-1'>
                <label className='block text-sm font-medium'>
                  รหัสไปรษณีย์
                </label>
                <LnInput
                  {...register('postalCode')}
                  placeholder='ใส่รหัสไปรษณีย์'
                />
              </div>
            </div>
          </section>

          <section className='border rounded-xl p-6'>
            <h2 className='font-semibold text-2xl mb-4'>วิธีการชำระเงิน</h2>
            <PaymentMethodTabs />
          </section>
        </div>

        <div className='border rounded-xl p-6 space-y-6 h-fit'>
          <h2 className='font-bold text-2xl'>สรุปรายการ</h2>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <h1>ราคารวม:</h1>
              <p className='font-medium'>฿1,290</p>
            </div>
            <div className='flex items-center justify-between'>
              <h1 className='font-bold text-xl'>ยอดรวมทั้งหมด:</h1>
              <p className='text-primary font-bold text-xl'>฿1,290</p>
            </div>
            <LnButton type='submit'>ชำระเงิน</LnButton>
          </div>
        </div>
      </main>
    </form>
  );
}
