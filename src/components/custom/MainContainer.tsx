'use client';

import Footer from '@/components/custom/Footer';
import Navbar from '@/components/custom/Navbar';
import { usePathname } from 'next/navigation';
import { Fragment, ReactNode } from 'react';

interface MainContainerProps {
  children: ReactNode;
}

export default function MainContainer({ children }: MainContainerProps) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <Fragment>
      {isAuthPage ? (
        <>{children}</>
      ) : (
        <div className='flex flex-col'>
          <Navbar />
          <main className='mt-18'>{children}</main>
          <Footer />
        </div>
      )}
    </Fragment>
  );
}
