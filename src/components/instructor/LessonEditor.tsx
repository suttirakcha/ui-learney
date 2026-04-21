"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Download, Trash2, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonDraft {
  title: string;
  content: string;
  videoUrl: string;
  durationMin: number;
  order: number;
  downloadable: boolean;
}

interface LessonEditorProps {
  initialLesson?: Partial<LessonDraft>;
  onSave: (lesson: LessonDraft) => void;
}

export default function LessonEditor({
  initialLesson,
  onSave,
}: LessonEditorProps) {
  const [lesson, setLesson] = useState<LessonDraft>({
    title: initialLesson?.title || "",
    content: initialLesson?.content || "",
    videoUrl: initialLesson?.videoUrl || "",
    durationMin: initialLesson?.durationMin || 15,
    order: initialLesson?.order || 1,
    downloadable: initialLesson?.downloadable || false,
  });

  const handleSave = () => {
    onSave(lesson);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            📖 บรรณาธิการบทเรียน
            <Badge variant="secondary" className="ml-2">
              บทที่ {lesson.order}
            </Badge>
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-1" />
              บันทึก
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-8">
        {/* Lesson Info */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                ชื่อบทเรียน
              </label>
              <Input
                value={lesson.title}
                onChange={(e) =>
                  setLesson({ ...lesson, title: e.target.value })
                }
                placeholder="บทที่ 1: พื้นฐาน AI"
                className="h-12"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">ลำดับ</label>
                <Input
                  type="number"
                  value={lesson.order}
                  onChange={(e) =>
                    setLesson({ ...lesson, order: parseInt(e.target.value) })
                  }
                  className="h-12 w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  ความยาว (นาที)
                </label>
                <Input
                  type="number"
                  value={lesson.durationMin}
                  onChange={(e) =>
                    setLesson({
                      ...lesson,
                      durationMin: parseInt(e.target.value),
                    })
                  }
                  className="h-12 w-full"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                URL วิดีโอ (YouTube)
              </label>
              <Input
                value={lesson.videoUrl}
                onChange={(e) =>
                  setLesson({ ...lesson, videoUrl: e.target.value })
                }
                placeholder="https://youtube.com/watch?v=..."
                className="h-12"
              />
              {lesson.videoUrl && (
                <Button variant="outline" className="mt-2 w-full">
                  <Play className="h-4 w-4 mr-2" />
                  ทดสอบวิดีโอ
                </Button>
              )}
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={lesson.downloadable}
                onChange={(e) =>
                  setLesson({ ...lesson, downloadable: e.target.checked })
                }
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">อนุญาตให้ดาวน์โหลด</span>
            </label>
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <label className="text-sm font-medium mb-4 block">
            เนื้อหาบทเรียน
          </label>
          <Textarea
            value={lesson.content}
            onChange={(e) => setLesson({ ...lesson, content: e.target.value })}
            placeholder="เขียนเนื้อหาบทเรียน... หรือคัดลอกจาก AI Assistant"
            className="min-h-[300px] font-sans text-base p-6 resize-vertical"
          />
        </div>

        {/* Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3">ตัวอย่างการแสดงผล</h4>
              <div
                className={cn(
                  "h-48 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex flex-col justify-between",
                  lesson.downloadable && "ring-2 ring-emerald-200",
                )}
              >
                <div>
                  <h3 className="font-bold text-lg line-clamp-1 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                    {lesson.content.substring(0, 100)}...
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>⏱️ {lesson.durationMin} นาที</span>
                  {lesson.videoUrl && <span>🎥 วิดีโอ</span>}
                  {lesson.downloadable && <span>📥 ดาวน์โหลดได้</span>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 pt-8">
              <h4 className="font-semibold mb-4 text-center">การจัดการ</h4>
              <div className="space-y-3">
                <Button className="w-full h-12" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  บันทึกบทเรียน
                </Button>
                <Button variant="destructive" className="w-full h-12">
                  <Trash2 className="h-4 w-4 mr-2" />
                  ลบบทเรียน
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <Download className="h-4 w-4 mr-2" />
                  Export Markdown
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
