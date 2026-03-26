"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface OutcomeListProps {
  points: string[];
}

const OutcomeList: React.FC<OutcomeListProps> = ({ points }) => {
  return (
    <div className="py-8 px-8 bg-white rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">สิ่งที่คุณจะได้เรียนรู้</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 size={20} className="text-green-500 mt-1" />
            <span className="text-gray-700">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OutcomeList;
