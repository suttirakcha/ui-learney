import { Card, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  icon: React.ReactNode;
  description: string;
}

export function AnalyticsCard({
  title,
  value,
  change,
  trend,
  icon,
  description,
}: AnalyticsCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br p-6 relative overflow-hidden"
      >
        {/* Icon Background */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white drop-shadow-md">
              {value}
            </CardTitle>
            <p className="text-white/90 text-sm font-medium">{title}</p>
            <p className="text-white/70 text-xs">{description}</p>
          </div>

          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform">
            {icon}
          </div>
        </div>

        {/* Change Indicator */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
          <span
            className={cn(
              "text-sm font-bold flex items-center gap-1",
              trend === "up" ? "text-emerald-600" : "text-destructive",
            )}
          >
            {trend === "up" ? "↗️" : "↘️"} {Math.abs(change)}%
          </span>
        </div>
      </motion.div>
    </Card>
  );
}

// Usage Examples
export function RevenueCard() {
  return (
    <AnalyticsCard
      title="รายได้รวม"
      value="฿45,230"
      change={12.5}
      trend="up"
      icon={<DollarSign className="h-6 w-6 text-yellow-500" />}
      description="เพิ่มขึ้นจากเดือนที่แล้ว"
    />
  );
}

export function StudentsCard() {
  return (
    <AnalyticsCard
      title="ผู้เรียนใหม่"
      value="1,247"
      change={8.2}
      trend="up"
      icon={<Users className="h-6 w-6 text-emerald-500" />}
      description="ผู้เรียนทั้งหมด"
    />
  );
}

export function RatingCard() {
  return (
    <AnalyticsCard
      title="คะแนนเฉลี่ย"
      value="4.8"
      change={0.3}
      trend="up"
      icon={<Star className="h-6 w-6 text-amber-500" />}
      description="จากรีวิวทั้งหมด"
    />
  );
}
