import { CourseCard } from "./CourseCard";
import { useTranslations } from "next-intl";

const courses = [
  { title: "Complete Web Development Bootcamp 2024", price: "$89.99" },
  { title: "UI/UX Design Masterclass", price: "$79.99" },
  { title: "Digital Marketing Strategy 2024", price: "$69.99" },
  { title: "Python Programming for Beginners", price: "$74.99" },
  { title: "Business Strategy Fundamentals", price: "$84.99" },
  { title: "Data Science with Python", price: "$94.99" },
];

export default function CourseList() {
  const t = useTranslations("home.courseList");
  
  return (
    <section className="px-8 py-16">
      <h3 className="text-2xl font-semibold mb-6">{t("trending")}</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </section>
  );
}
