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
    price: "฿1,999",
    category: "คณิตศาสตร์",
    title: "ปลดล็อกสกิลคณิต เข้าใจง่าย ไม่ปวดหัว",
    instructor: "อาจารย์ตุ๋น ต้มแซ่บ",
    rating: 4.8,
    students: 12543,
    duration: "42 ชั่วโมง",
    level: "ระดับเริ่มต้น",
    image: "https://res.cloudinary.com/dxggc6pvz/image/upload/v1774557163/red_ovxuru.jpg",
  },
  {
    id: "2",
    price: "฿2,345",
    category: "การพัฒนาซอฟต์แวร์",
    title: "อัปสกิล Frontend ด้วย Advanced React & Redux",
    instructor: "อาจารย์ยู หัวหยิก",
    rating: 4.9,
    students: 8932,
    duration: "28 ชั่วโมง",
    level: "ระดับขั้นสูง",
    image: "https://res.cloudinary.com/dxggc6pvz/image/upload/v1774557869/pink1_cnqvpv.jpg",
  },
  {
    id: "3",
    price: "฿3,212",
    category: "การออกแบบ",
    title: "เจาะลึกการออกแบบ UI/UX สู่มืออาชีพ (สอนใช้ Figma)",
    instructor: "อาจารย์บอส",
    rating: 4.7,
    students: 15672,
    duration: "35 ชั่วโมง",
    level: "ระดับกลาง",
    image: "https://res.cloudinary.com/dxggc6pvz/image/upload/v1774557162/green_pyjvnz.jpg",
  },
  {
    id: "4",
    price: "฿9,999",
    category: "ภาษา",
    title: "ภาษาอังกฤษเพื่อการเดินทางและท่องเที่ยว",
    instructor: "อาจารย์มาร์ค",
    rating: 4.6,
    students: 10234,
    duration: "45 ชั่วโมง",
    level: "ระดับเริ่มต้น",
    image: "https://res.cloudinary.com/dxggc6pvz/image/upload/v1774557161/blue_wapfkn.jpg",
  },
  {
    id: "5",
    price: "฿1,799",
    category: "การพัฒนาซอฟต์แวร์",
    title: "Node.js & Express ตั้งแต่ศูนย์สู่ Production",
    instructor: "อาจารย์นิค",
    rating: 4.8,
    students: 7320,
    duration: "32 ชั่วโมง",
    level: "ระดับกลาง",
    image: "https://res.cloudinary.com/dxggc6pvz/image/upload/v1774557869/pink1_cnqvpv.jpg",
  },
  {
    id: "6",
    price: "฿2,999",
    category: "การพัฒนาซอฟต์แวร์",
    title: "Python สำหรับ Data Science และ Machine Learning",
    instructor: "ดร.เอก",
    rating: 4.9,
    students: 21000,
    duration: "60 ชั่วโมง",
    level: "ระดับกลาง",
    image: "https://res.cloudinary.com/dxggc6pvz/image/upload/v1774557163/red_ovxuru.jpg",
  },
  {
    id: "7",
    price: "฿1,500",
    category: "การออกแบบ",
    title: "Graphic Design ด้วย Adobe Illustrator",
    instructor: "อาจารย์มิ้ว",
    rating: 4.5,
    students: 9100,
    duration: "20 ชั่วโมง",
    level: "ระดับเริ่มต้น",
    image: "https://res.cloudinary.com/dxggc6pvz/image/upload/v1774557162/green_pyjvnz.jpg",
  },
  {
    id: "8",
    price: "฿2,200",
    category: "ภาษา",
    title: "ภาษาญี่ปุ่นสำหรับผู้เริ่มต้น N5-N4",
    instructor: "อาจารย์ซากุระ",
    rating: 4.7,
    students: 13400,
    duration: "50 ชั่วโมง",
    level: "ระดับเริ่มต้น",
    image: "https://res.cloudinary.com/dxggc6pvz/image/upload/v1774557161/blue_wapfkn.jpg",
  },
];
