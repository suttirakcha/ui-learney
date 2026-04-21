import { PromotionCard } from "@/components/PromotionCard";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Promotion } from "@/types/promotion";
import { Metadata } from "next";
import { Tag } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "โปรโมชั่นคอร์สเรียน | Learney",
  description: "โปรโมชั่นล่าสุด Flash Sale, Seasonal Campaign, โค้ดลดราคา",
};

export default async function PromotionsPage() {
  let promotions: Promotion[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/promotions/active`,
      {
        next: { revalidate: 60 },
      },
    );
    promotions = await res.json();
  } catch (error) {
    console.error("Failed to fetch promotions", error);
  }

  const flashSales = promotions.filter((p) => p.type === "FLASH_SALE");
  const seasonal = promotions.filter((p) => p.type === "SEASONAL_SALE");
  const promoCodes = promotions.filter((p) => p.type === "PROMO_CODE");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-32 px-4">
        <div className="container mx-auto text-center text-white relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            โปรโมชั่นพิเศษ
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-95">
            เรียนรู้ทักษะใหม่ในราคาพิเศษ Flash Sale, Seasonal Campaign, โค้ดลด
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Badge className="text-2xl py-4 px-8 bg-white/20 backdrop-blur">
              เรียนวันนี้ ใช้ได้จริง
            </Badge>
            <CountdownTimer
              endDate={promotions[0]?.endDate || ""}
              className="text-xl py-4 px-8 bg-white/20 backdrop-blur"
            />
          </div>
          <Button
            asChild
            size="lg"
            className="text-xl px-12 py-8 bg-white text-purple-600 hover:bg-white/90 font-bold shadow-2xl"
          >
            <Link href="/courses">ดูคอร์สทั้งหมด</Link>
          </Button>
        </div>
        <div className="absolute inset-0 bg-black/20" />
      </section>

      <div className="container mx-auto px-4 py-20 space-y-20">
        {/* Flash Sale */}
        {flashSales.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
              <Badge
                variant="destructive"
                className="text-2xl py-3 px-6 bg-gradient-to-r from-red-500 to-orange-500 shadow-lg"
              >
                ⚡ Flash Sale
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                ลดกระหน่ำวันนี้วันเดียว
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {flashSales.map((promo) => (
                <PromotionCard key={promo.id} promotion={promo} />
              ))}
            </div>
          </section>
        )}

        {/* Seasonal */}
        {seasonal.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
              <Badge
                variant="secondary"
                className="text-2xl py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg"
              >
                🎉 Seasonal
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                แคมเปญตามฤดูกาล
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {seasonal.map((promo) => (
                <PromotionCard key={promo.id} promotion={promo} />
              ))}
            </div>
          </section>
        )}

        {/* Promo Codes */}
        {promoCodes.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
              <Badge
                variant="outline"
                className="text-2xl py-3 px-6 border-purple-200 bg-purple-50 shadow-lg"
              >
                💰 โค้ดลด
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                กรอกโค้ดรับส่วนลดทันที
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promoCodes.map((promo) => (
                <PromotionCard key={promo.id} promotion={promo} />
              ))}
            </div>
          </section>
        )}

        {promotions.length === 0 && (
          <div className="text-center py-32">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Tag className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              ยังไม่มีโปรโมชัน
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              ติดตามเพื่อรับโปรโมชันพิเศษในอนาคต
            </p>
            <Button size="lg" asChild>
              <Link href="/courses">ดูคอร์สทั้งหมด</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
