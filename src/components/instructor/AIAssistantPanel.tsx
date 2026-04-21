"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

type GeneratedOutline = {
  title: string;
  lessons: Array<{ title: string }>;
  highlights?: string[];
};

async function generateAiOutline(input: {
  category: string;
  difficulty: string;
  targetAudience: string;
  prompt: string;
}): Promise<GeneratedOutline> {
  return Promise.resolve({
    title: `${input.prompt} สำหรับ${input.targetAudience}`,
    lessons: [
      { title: "บทนำ" },
      { title: "แนวคิดหลัก" },
      { title: "ลงมือใช้งานจริง" },
    ],
    highlights: [`เหมาะกับสาย ${input.category}`, `ระดับ ${input.difficulty}`],
  });
}

export function AIAssistantPanel() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [outline, setOutline] = useState<GeneratedOutline | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await generateAiOutline({
        category: "AI_TECH",
        difficulty: "BEGINNER",
        targetAudience: "วัยทำงาน",
        prompt: input,
      });
      setOutline(response);
    } catch (error) {
      console.error("AI Generation failed", error);
    }
    setLoading(false);
  };

  return (
    <Card className="border-fuchsia-200 bg-gradient-to-br from-fuchsia-50/50 to-purple-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-fuchsia-400 to-purple-400 rounded-lg flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-lg font-bold text-fuchsia-800">
            AI Course Builder
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          สร้างคอร์สทั้งคอร์สใน 1 คลิก! ใช้ Gemini ฟรี
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="เช่น: AI ทำเงิน, Marketing TikTok, จิตวิทยา..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-12 border-fuchsia-200 focus:border-fuchsia-400"
          />
          <Button
            onClick={handleGenerate}
            disabled={loading || !input}
            className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600"
          >
            {loading ? "กำลังสร้าง..." : "✨ สร้างคอร์ส AI"}
          </Button>
        </div>

        {outline && (
          <div className="space-y-3 p-4 bg-white/50 rounded-2xl border border-fuchsia-100">
            <h4 className="font-bold text-fuchsia-800">คอร์สที่สร้าง:</h4>
            <div className="text-sm space-y-1">
              <p>
                <strong>ชื่อคอร์ส:</strong> {outline.title}
              </p>
              <p>
                <strong>บทเรียน:</strong> {outline.lessons.length} บท
              </p>
              <p>
                <strong>ไฮไลท์:</strong> {outline.highlights?.[0]}
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                ใช้คอร์สนี้ ➜
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
