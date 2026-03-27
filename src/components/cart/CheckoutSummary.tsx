import { CheckoutProps } from '@/schemas/checkout.schema';
import LnButton from '../custom/LnButton';

export default function CheckoutSummary() {
  return (
    <div className='border rounded-xl p-6 space-y-6'>
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
        <LnButton>ชำระเงิน</LnButton>
      </div>
    </div>
  );
}
