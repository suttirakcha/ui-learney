"use client";

import React from "react";
import { PlayCircle } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface LessonStructureProps {
  lessons: Lesson[];
}

const LessonStructure: React.FC<LessonStructureProps> = ({ lessons }) => {
  return (
    <div className="py-8 px-8 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">โครงสร้างบทเรียน</h2>
      <ul className="divide-y divide-gray-200">
        {lessons.map((lesson, index) => (
          <li key={index} className="py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <PlayCircle size={20} className="text-cyan-500" />
              <span className="text-gray-900 font-medium">{lesson.title}</span>
            </div>
            <span className="text-gray-600">{lesson.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonStructure;
