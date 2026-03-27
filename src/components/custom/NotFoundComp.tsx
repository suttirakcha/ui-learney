import Link from 'next/link';
import LnButton from './LnButton';

export default function NotFoundComp() {
  return (
    <div className='flex flex-col gap-6 items-center p-10'>
      <div className='flex flex-col gap-2 items-center'>
        <h1 className='text-5xl font-bold'>404</h1>
        <p className='text-muted-foreground text-lg'>ไม่พบหน้าที่คุณค้นหา</p>
      </div>

      <Link href='/'>
        <LnButton>กลับสู่หน้าแรก</LnButton>
      </Link>
    </div>
  );
}
