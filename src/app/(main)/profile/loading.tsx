'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileLoading() {
  const setLoading = () => new Promise((resolve) => resolve);

  setTimeout(setLoading, 50000);

  return (
    <div>
      <Skeleton />
      <div className='max-w-7xl w-full mx-auto grid grid-cols-3 gap-10 p-8'>
        <div>
          {/* <ProfileSidebar role={
        'INSTRUCTOR'} /> */}
        </div>
        <div className='col-span-2'>Loading...</div>
      </div>
    </div>
  );
}
