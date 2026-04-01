import StudentHistory from '@/components/student/StudentHistory';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ประวัติเรียนของฉัน',
};

export default function PageHistory() {
  return (
    <div>
      <StudentHistory />
    </div>
  );
}
