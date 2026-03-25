import { Input } from '@/components/ui/input';
import LnButton from '../LnButton';
import { Button } from '@/components/ui/button';

export default function Payment() {
  return (
    <div className='border rounded-xl p-6 space-y-6'>
      <h2 className='font-bold text-2xl'>สรุปรายการ</h2>
      <form className='flex flex-col gap-4'>
        <div className='space-y-1'>
          <h2 className='font-semibold'>รหัสคูปอง</h2>
          <div className='flex gap-2'>
            <Input type='text' placeholder='ใส่รหัสคูปอง' />
            <Button variant='outline'>ใช้</Button>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <h1>ราคารวม:</h1>
          <p className='font-medium'>฿1,290</p>
        </div>
        <div className='flex items-center justify-between'>
          <h1 className='font-bold text-xl'>ยอดรวมทั้งหมด:</h1>
          <p className='text-primary font-bold text-xl'>฿1,290</p>
        </div>
        <LnButton>ชำระเงิน</LnButton>
        <p className='text-muted-foreground text-xs text-center'>
          รับประกันคืนเงิน 30 วัน
        </p>
      </form>
    </div>
  );
}
