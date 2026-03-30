import OverviewPage from '@/components/student/profile/OverviewPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ภาพรวมของฉัน',
};

export default function page() {
  return (
    <div>
      <OverviewPage />
    </div>
  );
}
