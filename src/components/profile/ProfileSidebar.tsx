'use client';

import { getMenusWithRole } from '@/lib/profile-menus';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface ProfileSidebarProps {
  role: 'USER' | 'ADMIN' | 'INSTRUCTOR';
}

export default function ProfileSidebar({ role }: ProfileSidebarProps) {
  const t = useTranslations('profile.sidebar');
  const menus = getMenusWithRole(role);
  const pathname = usePathname();

  return (
    <div className='space-y-4'>
      <div className='border border-accent rounded-xl lg:sticky top-10 w-full'>
        {menus.map((menu) => {
          const menuLink = `/profile${menu.href}`;
          // Menu label translations can be handled if profile-menus.ts returns translation keys.
          return (
            <Link
              href={menuLink}
              key={menu.label}
              className={cn(
                'flex items-center px-4 py-3 m-4 gap-2 hover:bg-primary hover:text-white rounded-lg transition-all duration-200',
                pathname === menuLink && 'bg-primary text-white'
              )}
            >
              {menu.icon}
              {t(menu.label as any)}
            </Link>
          );
        })}
        <button className='flex items-center px-4 py-3 m-4 gap-2 hover:bg-primary hover:text-white rounded-lg transition-all duration-200'>
          <LogOut />
          <p>{t('logout')}</p>
        </button>
      </div>

      {role === 'ADMIN' && (
        <div className='border border-accent rounded-xl p-4 space-y-2'>
          <p className='text-xl font-semibold'>{t('quickActions')}</p>

          <Link
            href='/dashboard/pending-courses'
            className='flex w-full text-left px-4 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200'
          >
            {t('approveCourses')}
          </Link>

          <button className='flex w-full text-left px-4 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200'>
            {t('manageUsers')}
          </button>

          <button className='flex w-full text-left px-4 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200'>
            {t('viewAnalytics')}
          </button>
        </div>
      )}
    </div>
  );
}
