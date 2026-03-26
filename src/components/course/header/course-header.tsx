import React from "react";

interface CourseHeaderProps {
  categoryName: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ categoryName }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-cyan-300 px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-4">{categoryName}</h1>
        <div className="flex items-center gap-3">
          <p className="text-white text-lg">
            ค้นพบคอร์สเรียนที่หลากหลาย และเริ่มต้นเรียนรู้ได้แล้ววันนี้
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
