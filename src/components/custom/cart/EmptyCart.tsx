import React from 'react';
import LnButton from '../LnButton';

export default function EmptyCart() {
  return (
    <div className='max-w-md mx-auto w-full'>
      <div className='border rounded-xl flex flex-col items-center p-6 gap-4'>
        <h2 className='text-3xl font-bold'>ตะกร้าว่างเปล่า</h2>
        <p className='text-muted-foreground'>ยังไม่มีคอร์สในตะกร้าของคุณ</p>
        <LnButton>เลือกคอร์ส</LnButton>
      </div>
    </div>
  );
}
