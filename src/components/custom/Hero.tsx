import Link from "next/link";
import LnButton from "./LnButton";
import SearchForm from "../forms/SearchForm";

export default function Hero() {
  return (
    <section className="bg-primary text-white text-center py-20 px-4 space-y-6">
      <div className="space-y-6">
        <h2 className="text-5xl font-bold">เรียนรู้อะไรก็ได้ เมื่อไหร่ก็ได้</h2>
        <p className="text-xl max-w-lg mx-auto">
          ค้นพบหลักสูตรออนไลน์หลากหลาย พัฒนาทักษะใหม่ๆ
          และบรรลุเป้าหมายของคุณกับผู้เชี่ยวชาญชั้นนำ
        </p>
      </div>
      <div className="max-w-xl mx-auto mb-4">
        <SearchForm placeholder="What do you want to learn?" />
      </div>
      <Link href="/course">
        <LnButton variant="secondary">ดูคอร์สทั้งหมด</LnButton>
      </Link>
    </section>
  );
}
