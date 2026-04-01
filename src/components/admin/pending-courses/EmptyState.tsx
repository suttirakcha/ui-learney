import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function EmptyState() {
  return (
    <Card className="py-16">
      <CardContent className="flex flex-col items-center text-center space-y-4">
        <div className="bg-blue-100 p-4 rounded-full">
          <CheckCircle className="text-blue-500 w-8 h-8" />
        </div>

        <h2 className="text-lg font-semibold">ไม่มีคอร์สที่รออนุมัติ</h2>

        <p className="text-sm text-muted-foreground">
          คอร์สทั้งหมดได้รับการตรวจสอบแล้ว
        </p>

        <Link href="/admin/profile">
          <Button variant="outline">กลับไปยังโปรไฟล์</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
