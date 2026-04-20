import { getHomePageData } from "@/lib/api/experience.service";

export default async function HomePage() {
  try {
    const data = await getHomePageData();

    // ตรวจสอบว่าได้ Fallback data กลับมาแบบว่างเปล่าหรือไม่ (เช่นกรณี API ร่วง)
    const isDataEmpty =
      !data ||
      (data.categories?.length === 0 && data.featuredCourses?.length === 0);

    if (isDataEmpty) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="bg-red-50 text-red-600 p-8 rounded-2xl max-w-lg w-full border border-red-100 shadow-sm">
            <h1 className="text-2xl font-bold mb-3">
              ขออภัย ไม่สามารถโหลดข้อมูลได้
            </h1>
            <p className="text-red-500 text-sm">
              ระบบกำลังประสบปัญหาในการเชื่อมต่อเซิร์ฟเวอร์
              กรุณาลองรีเฟรชหน้าใหม่อีกครั้ง หรือกลับมาใช้งานใหม่ในภายหลัง
            </p>
          </div>
        </div>
      );
    }

    return (
      <main>
        {/* โค้ดเดิมสำหรับ Render UI หน้า Home ปกติ นำมาใส่ตรงนี้ได้เลย */}
        {/* <HeroSection hero={data.hero} /> */}
      </main>
    );
  } catch (error) {
    console.error("[HomePage] Critical Error:", error);
    return (
      <div className="flex items-center justify-center min-h-screen text-center p-4">
        <p className="text-red-500 font-medium">
          เกิดข้อผิดพลาดร้ายแรงในระบบ กรุณาลองใหม่ภายหลัง
        </p>
      </div>
    );
  }
}
