import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function SecurityCard() {
  const t = useTranslations('profile.security');

  return (
    <div className='space-y-6 p-6 rounded-xl border border-accent'>
      <h2 className='text-2xl font-semibold'>{t('title')}</h2>
      <div className='p-6 rounded-xl border border-accent flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          <div className='bg-primary/10 p-3 rounded-full'>
            <Lock className='text-primary w-6 h-6' />
          </div>

          <div>
            <p className='font-medium'>{t('changePassword')}</p>
            <p className='text-sm text-gray-500'>
              {t('changePasswordDesc')}
            </p>
          </div>
        </div>

        <Button variant='outline'>{t('edit')}</Button>
      </div>
    </div>
  );
}
