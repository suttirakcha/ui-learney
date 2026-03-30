import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-primary text-white text-center py-20 px-4">
      <h2 className="text-4xl font-bold mb-4">
        เรียนรู้อะไรก็ได้ เมื่อไหร่ก็ได้
      </h2>
      <p className="mb-6">ค้นหาคอร์สออนไลน์ที่ใช่สำหรับคุณ</p>
      <div className="max-w-xl mx-auto mb-4 ">
        <Input
          className="bg-white text-black"
          placeholder="What do you want to learn?"
        />
      </div>
      <Link href="/course">
        <Button variant="secondary">ดูคอร์สทั้งหมด</Button>
      </Link>
    </section>
  );
}
