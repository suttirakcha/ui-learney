'use client';
import { useTranslations } from "next-intl";

interface CourseHeaderProps {
  title?: string;
  description?: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  title = 'all',
  description = 'ค้นพบคอร์สเรียนที่หลากหลาย และเริ่มต้นเรียนรู้ได้แล้ววันนี้',
}) => {
  const tCat = useTranslations("categories");
  const tMeta = useTranslations("pages.metadata");

  return (
    <div className='bg-linear-to-r from-cyan-400 to-cyan-300 px-8 py-16'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-sm'>
          {tCat(title)}
        </h1>
        <p className='text-white text-base md:text-lg opacity-90 font-medium border-l-4 border-white/30 pl-4'>
          {description === 'ค้นพบคอร์สเรียนที่หลากหลาย และเริ่มต้นเรียนรู้ได้แล้ววันนี้' ? tMeta("allCoursesDesc") : description}
        </p>
      </div>
    </div>
  );
};

export default CourseHeader;
