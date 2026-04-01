'use client';

import Link from 'next/link';
import { useTranslations } from "next-intl";

type Props = {
  active?: 'overview' | 'settings';
};

export default function Sidebar({ active = 'overview' }: Props) {
  const t = useTranslations("admin.sidebar");

  return (
    <div className='w-64 space-y-4'>
      <div className='bg-white rounded-2xl p-4 shadow-sm space-y-2'>
        {/* OVERVIEW */}
        <Link
          href='/admin/profile'
          className={`block w-full px-3 py-2 rounded-xl ${
            active === 'overview'
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          {t("overview")}
        </Link>

        {/* SETTINGS */}
        <Link
          href='/admin/settings'
          className={`block w-full px-3 py-2 rounded-xl ${
            active === 'settings'
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          {t("settings")}
        </Link>

        {/* LOGOUT */}
        <button className='w-full text-left px-3 py-2 rounded-xl text-red-500 hover:bg-red-50'>
          {t("logout")}
        </button>
      </div>

      {/* Quick Actions */}
      <div className='bg-white rounded-2xl p-4 shadow-sm space-y-2'>
        <p className='text-sm font-semibold text-gray-500'>{t("quickActions")}</p>

        <button className='w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100'>
          {t("approveCourses")}
        </button>

        <button className='w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100'>
          {t("manageUsers")}
        </button>

        <button className='w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100'>
          {t("viewAnalytics")}
        </button>
      </div>
    </div>
  );
}
