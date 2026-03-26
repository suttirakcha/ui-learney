export interface Course {
  id: string;
  price: string;
  category: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  image: string;
}

export const coursesData: Course[] = [
  {
    id: "1",
    price: "฿1999",
    category: "คณิตศาสตร์",
    title: "ปลดล็อกสกิลคณิต เข้าใจง่าย ไม่ปวดหัว",
    instructor: "อาจารย์ตุ๋น ต้มแซ่บ",
    rating: 4.8,
    students: 12543,
    duration: "42 hours",
    level: "ระดับเริ่มต้น",
    image:
      "https://res.cloudinary.com/dxggc6pvz/image/upload/v1774557163/red_ovxuru.jpg",
  },
  {
    id: "2",
    price: "฿2345",
    category: "การพัฒนาซอฟต์แวร์",
    title: "อัปสกิล Frontend ด้วย Advanced React & Redux",
    instructor: "อาจารย์ยู หัวหยิก",
    rating: 4.9,
    students: 8932,
    duration: "28 hours",
    level: "ระดับขั้นสูง",
    image:
      "https://res.cloudinary.com/dxggc6pvz/image/upload/v1774557869/pink1_cnqvpv.jpg",
  },
  {
    id: "3",
    price: "฿3212",
    category: "การออกแบบ",
    title: "เจาะลึกการออกแบบ UI/UX สู่มืออาชีพ (สอนใช้ Figma)",
    instructor: "อาจารย์บอส",
    rating: 4.7,
    students: 15672,
    duration: "35 hours",
    level: "ระดับกลาง",
    image:
      "https://res.cloudinary.com/dxggc6pvz/image/upload/v1774557162/green_pyjvnz.jpg",
  },
  {
    id: "4",
    price: "฿9999",
    category: "ภาษา",
    title: "ภาษาอังกฤษเพื่อการเดินทางและท่องเที่ยว",
    instructor: "David Kumar",
    rating: 4.6,
    students: 10234,
    duration: "45 hours",
    level: "ระดับเริ่มต้น",
    image:
      "https://res.cloudinary.com/dxggc6pvz/image/upload/v1774557161/blue_wapfkn.jpg",
  },
];
