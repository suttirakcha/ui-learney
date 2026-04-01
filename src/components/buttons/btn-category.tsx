"use client";

import React, { useState } from "react";
import CategoryButtons from "@/components/course/category/category-btn";

export default function BtnCategory() {
  const [currentCategory, setCurrentCategory] = useState("All Courses");

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Category Buttons
        </h1>

        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Default View (กำลังเลือก: {currentCategory})
          </h2>

          <CategoryButtons
          // selectedCategory={currentCategory}
          // onCategoryChange={(category) => {
          //   setCurrentCategory(category);
          //   console.log("หมวดหมู่ที่ถูกคลิก:", category);
          // }}
          />
        </div>
      </div>
    </div>
  );
}
