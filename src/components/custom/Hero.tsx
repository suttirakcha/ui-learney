import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import LnButton from "./LnButton";

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
        <InputGroup className="bg-accent text-accent-foreground p-2 h-10">
          <InputGroupInput
            placeholder="What do you want to learn?"

            // value={searchValue}
            // onChange={(e) => setSearchValue(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <Link href="/course">
        <LnButton variant="secondary">ดูคอร์สทั้งหมด</LnButton>
      </Link>
    </section>
  );
}
