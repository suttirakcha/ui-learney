import { getMenusWithRole } from '@/lib/profile-menus';
import { Fragment } from 'react';

interface InstructorProfilePageProps {
  params: { path: string };
}

export async function generateMetadata({ params }: InstructorProfilePageProps) {
  const { path } = await params;
  const menus = getMenusWithRole('USER');

  const profileLabel = menus.find((menu) => menu.href === `/${path}`)?.label;

  return {
    title: profileLabel,
  };
}

export default async function InstructorProfilePage({
  params,
}: InstructorProfilePageProps) {
  const { path } = await params;
  const menus = getMenusWithRole('USER');

  const profileComponent = menus.find(
    (menu) => menu.href === `/${path}`,
  )?.component;

  return <Fragment>{profileComponent}</Fragment>;
}
