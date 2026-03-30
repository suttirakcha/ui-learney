import type { Metadata } from 'next';
import { Kanit, Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/app/lib/AuthContext'; // ✅ เพิ่ม
import MainContainer from '@/components/custom/MainContainer';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const kanit = Kanit({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: {
    default: 'Learney',
    template: '%s - Learney',
  },
  description: '...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={cn(
        'h-full',
        'antialiased',
        kanit.className,
        'font-sans',
        geist.variable
      )}
    >
      <body className='min-h-full flex flex-col'>
        <AuthProvider>
          {' '}
          {/* ✅ ครอบตรงนี้ */}
          <MainContainer>{children}</MainContainer>
          <Toaster position='top-center' />
        </AuthProvider>
      </body>
    </html>
  );
}
