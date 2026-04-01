import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SecurityCard() {
  return (
    <div className='space-y-6 p-6 rounded-xl border border-accent'>
      <h2 className='text-2xl font-semibold'>Security</h2>
      <div className='p-6 rounded-xl border border-accent flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          <div className='bg-primary/10 p-3 rounded-full'>
            <Lock className='text-primary w-6 h-6' />
          </div>

          <div>
            <p className='font-medium'>เปลี่ยนรหัสผ่าน</p>
            <p className='text-sm text-gray-500'>
              Update your password to keep your account secure
            </p>
          </div>
        </div>

        <Button variant='outline'>แก้ไข</Button>
      </div>
    </div>
  );
}
