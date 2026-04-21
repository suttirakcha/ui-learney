"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Percent, Calendar } from "lucide-react";
import Link from "next/link";
import { Promotion } from "@/types/promotion"; // Assume type

interface PromotionCardProps {
  promotion: Promotion;
}

export function PromotionCard({ promotion }: PromotionCardProps) {
  const now = new Date();
  const endDate = new Date(promotion.endDate);
  const timeLeft = Math.max(0, endDate.getTime() - now.getTime());
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const discountText = promotion.discount
    ? `${promotion.discount}%`
    : `฿${promotion.discountAmount}`;

  return (
    <Card className="group hover:shadow-xl transition-all border-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 overflow-hidden h-full">
      <CardHeader className="pb-4">
        <div className="flex gap-2 mb-2 flex-wrap">
          <Badge
            variant="destructive"
            className="bg-gradient-to-r from-red-500 to-orange-500"
          >
            {promotion.type === "FLASH_SALE" ? "แฟลชเซล" : "แคมเปญพิเศษ"}
          </Badge>
          <Badge variant="secondary">
            <Percent className="w-3 h-3 mr-1" />
            {discountText}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600">
          {promotion.title.th || promotion.title["th"]}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-48 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500" />
        {promotion.banner && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={promotion.banner}
            alt={promotion.title.th}
            className="absolute inset-0 w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />
        )}
        <div className="p-6 pt-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {promotion.description?.th}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <Calendar className="w-3 h-3" />
            หมดเขต {days} วัน {hours} ชม.
          </div>
          {promotion.courses.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1">
              {promotion.courses.slice(0, 3).map((pc) => (
                <Badge
                  key={pc.courseId}
                  variant="outline"
                  className="max-w-full px-2 py-1"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  <span className="truncate">
                    {pc.course.courseName.slice(0, 20)}
                    {pc.course.courseName.length > 20 ? "..." : ""}
                  </span>
                </Badge>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Link href={`/promotions/${promotion.slug || promotion.id}`}>
                ดูคอร์สลดราคา
              </Link>
            </Button>
            {promotion.code && (
              <Button variant="outline" size="sm" className="w-12 h-10 p-0">
                คัดลอก
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
