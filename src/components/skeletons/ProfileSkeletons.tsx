'use client';

import { Skeleton } from '../ui/skeleton';

export default function ProfileSkeletons() {
  return (
    <div>
      <div className='max-w-7xl w-full p-8 flex items-center mx-auto gap-6'>
        <Skeleton className='w-32 h-32 rounded-full' />
        <div className='flex flex-col gap-2'>
          <Skeleton className='w-40 h-8' />
          <Skeleton className='w-60 h-4' />
        </div>
      </div>
      <div className='max-w-7xl w-full mx-auto grid grid-cols-3 gap-10 p-8'>
        <div>
          <Skeleton className='w-full h-120' />
        </div>
        <div className='col-span-2 space-y-6'>
          <Skeleton className='w-60 h-6' />
          <div className='flex flex-col gap-4'>
            <Skeleton className='w-full h-20' />
            <Skeleton className='w-full h-20' />
            <Skeleton className='w-full h-20' />
          </div>
        </div>
      </div>
    </div>
  );
}
