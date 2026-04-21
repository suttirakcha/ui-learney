import Link from "next/link";
import LnButton from "./LnButton";

export default function CTA() {
  return (
    <section className="psychology-surface text-primary-foreground text-center py-16 space-y-6">
      <h2 className="text-5xl font-bold">มาเป็นผู้สอน</h2>
      <p className="text-xl max-w-lg mx-auto">
        แบ่งปันความรู้ของคุณให้กับผู้เรียนทั่วโลก
      </p>
      <Link href="/become-instructor">
        <LnButton variant="secondary">เริ่มสอน</LnButton>
      </Link>
    </section>
  );
}
