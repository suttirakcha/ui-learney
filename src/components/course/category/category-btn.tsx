"use client";
import { useTranslations } from "next-intl";

interface CategoryButtonsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const t = useTranslations("categories");
  const categories = [
    "all",
    "math",
    "software",
    "design",
    "language",
  ];

  return (
    <div className="flex gap-3 flex-wrap mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition whitespace-nowrap ${
            selectedCategory === category
              ? "bg-cyan-400 text-white shadow-md hover:bg-cyan-500"
              : "bg-white text-gray-800 border-2 border-gray-200 hover:border-gray-400 hover:bg-cyan-50"
          }`}
        >
          {t(category)}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
