import { Course } from '@/types/course';
import { Trash2 } from 'lucide-react';
import LnButton from '../custom/LnButton';

interface CartItemProps {
  course: Course;
}

export default function CartItem({ course }: CartItemProps) {
  const { courseName, price, instructor } = course;

  const priceAmount =
    typeof price === 'number' ? price?.toLocaleString() : price;

  return (
    <div className='border rounded-xl p-6'>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          {/* Image */}
          <div className='bg-gray-300 rounded-md w-30 h-20'></div>

          {/* Course detail */}
          <div className='space-y-2'>
            <div className='space-y-1'>
              <h1 className='text-2xl font-bold'>{courseName}</h1>
              <p className='text-muted-foreground'>โดย {instructor}</p>
            </div>
            <h2 className='text-primary font-bold text-xl'>฿{priceAmount}</h2>
          </div>
        </div>

        {/* Delete item from cart */}
        <LnButton
          variant='ghost'
          className='flex items-center gap-2 text-destructive'
        >
          <Trash2 />
          ลบ
        </LnButton>
      </div>
    </div>
  );
}
