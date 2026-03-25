import { Input } from '@/components/ui/input';
import LnButton from '../LnButton';
import { Button } from '@/components/ui/button';

export default function Payment() {
  return (
    <div className='border rounded-xl p-6'>
      <form className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <Input type='text' />
          <Button>ใช้</Button>
        </div>
        <LnButton>ชำระเงิน</LnButton>
        <p className='text-muted-foreground text-xs text-center'>
          รับประกันคืนเงิน 30 วัน
        </p>
      </form>
    </div>
  );
}
