import HistoryPage from '@/components/student/history/HistoryPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ประวัติเรียนของฉัน',
};

export default function PageHistory() {
  return (
    <div>
      <HistoryPage />
    </div>
  );
}
