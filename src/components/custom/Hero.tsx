import Link from "next/link";
import LnButton from "./LnButton";
import SearchBar from "@/components/search-bar";

export default function Hero() {
  return (
    <section className="bg-primary text-white text-center py-20 px-4 space-y-6">
      <div className="space-y-4 animate-fadeIn">
        <h2 className="text-5xl font-bold">เรียนรู้อะไรก็ได้ เมื่อไหร่ก็ได้</h2>
        <p className="text-xl max-w-lg mx-auto opacity-90">
          ค้นพบหลักสูตรออนไลน์หลากหลาย พัฒนาทักษะใหม่ๆ
          และบรรลุเป้าหมายของคุณกับผู้เชี่ยวชาญชั้นนำ
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <SearchBar placeholder="ค้นหาคอร์สที่ต้องการ เช่น React, Python, Design..." />
      </div>

      <Link href="/course">
        <LnButton variant="secondary">ดูคอร์สทั้งหมด</LnButton>
      </Link>
    </section>
  );
}
