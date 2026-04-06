import type { StudentOverviewData } from "@/types/profile";
import { BookOpen, CircleCheckBig, Wallet } from "lucide-react";

interface StudentInfoCardProps {
  stats?: StudentOverviewData["stats"];
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function StudentInfoCard({ stats }: StudentInfoCardProps) {
  const overviewStats = stats ?? {
    enrolledCourses: 0,
    successfulPayments: 0,
    totalSpent: 0,
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-md border-2 bg-background p-4 flex justify-between gap-4">
        <div>
          <h4 className="text-accent-foreground">หลักสูตรที่ลงเรียน</h4>
          <p className="text-xl font-semibold">{overviewStats.enrolledCourses}</p>
        </div>
        <BookOpen className="text-blue-400" />
      </div>

      <div className="rounded-md border-2 bg-background p-4 flex justify-between gap-4">
        <div>
          <h4 className="text-accent-foreground">การชำระเงินสำเร็จ</h4>
          <p className="text-xl font-semibold">
            {overviewStats.successfulPayments}
          </p>
        </div>
        <CircleCheckBig className="text-green-400" />
      </div>

      <div className="rounded-md border-2 bg-background p-4 flex justify-between gap-4">
        <div>
          <h4 className="text-accent-foreground">ยอดใช้จ่ายรวม</h4>
          <p className="text-xl font-semibold">
            {formatCurrency(overviewStats.totalSpent)}
          </p>
        </div>
        <Wallet className="text-amber-500" />
      </div>
    </div>
  );
}
