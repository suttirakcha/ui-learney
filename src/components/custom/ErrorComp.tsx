import React from 'react';
import LnButton from './LnButton';

interface ErrorCompProps {
  onReset: () => void;
}

export default function ErrorComp({ onReset }: ErrorCompProps) {
  return (
    <div className='flex flex-col gap-4 items-center p-10'>
      <h1 className='text-3xl font-bold text-red-500'>มีบางอย่างผิดปกติ</h1>
      <LnButton onClick={onReset} variant={'destructive'}>
        ลองใหม่อีกครั้ง
      </LnButton>
    </div>
  );
}
