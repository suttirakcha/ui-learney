import LnButton from '@/components/custom/LnButton';
import Navbar from '@/components/custom/Navbar';

export default function Home() {
  // throw new Error('มัน error อยู่ ไม่เห็นรึไง');
  return (
    <div>
      <Navbar />
      <LnButton>SWAGGGGG</LnButton>
      <LnButton variant='ghost'>Ghost</LnButton>
    </div>
  );
}
