import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="bg-primary text-white text-center py-16">
      <h3 className="text-2xl font-semibold mb-4">มาเป็นผู้สอน</h3>
      <p className="mb-6">แบ่งปันความรู้ของคุณให้กับผู้เรียนทั่วโลก</p>
      <Link href="/become-instructor">
        <Button variant="secondary">เริ่มสอน</Button>
      </Link>
    </section>
  );
}
