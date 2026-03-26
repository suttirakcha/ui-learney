import Link from "next/link";
import { Card as UiCard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CourseCard({ title, price }: { title: string; price: string }) {
  return (
    <UiCard>
      <div className="h-40 bg-gray-200" />
      <CardContent className="p-4">
        <h4 className="font-semibold mb-2">{title}</h4>
        <p className="text-sm text-gray-500 mb-2">(รอ backend ทำข้อมูลจริง)</p>
        <p className="font-bold text-cyan-600 mb-4">{price}</p>

        <Link href="/courses/1">
          <Button className="w-full">ดูรายละเอียด</Button>
        </Link>
      </CardContent>
    </UiCard>
  );
}
