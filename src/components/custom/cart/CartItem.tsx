import LnButton from '../LnButton';
import { Trash2 } from 'lucide-react';

export default function CartItem() {
  return (
    <div className='border rounded-xl p-6'>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          {/* Image */}
          <div className='bg-gray-300 rounded-md w-30 h-20'></div>

          {/* Course detail */}
          <div className='space-y-2'>
            <div className='space-y-1'>
              <h1 className='text-2xl font-bold'>Course Item</h1>
              <p className='text-muted-foreground'>โดย สมรักษ์ ใจดี</p>
            </div>
            <h2 className='text-primary font-bold text-xl'>฿1,290</h2>
          </div>
        </div>

        {/* Delete item from cart */}
        <LnButton variant='ghost' className='p-2'>
          <Trash2 className='text-destructive' />
        </LnButton>
      </div>
    </div>
  );
}
