"use client";

import { useState, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Link2, Upload, Video } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function VideoUploader({
  onUpload,
}: {
  onUpload?: (url: string) => void;
}) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find((file) => file.type.startsWith("video/"));

    if (videoFile) {
      uploadVideo(videoFile);
    }
  };

  const uploadVideo = (file: File) => {
    void file;
    setUploadProgress(0);

    // Simulate upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            const mockUrl = "https://example.com/video-uploaded.mp4";
            setUploadedVideo(mockUrl);
            onUpload?.(mockUrl);
          }, 1000);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  const handleYoutubeUrl = () => {
    const url = prompt("ใส่ URL YouTube:");
    if (url) {
      setUploadedVideo(url);
      onUpload?.(url);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-6 w-6" />
          อัพโหลดวิดีโอ
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className={cn(
            "group relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300",
            dragActive
              ? "border-fuchsia-400 bg-fuchsia-50 ring-2 ring-fuchsia-200 ring-opacity-50"
              : "border-muted hover:border-primary/50",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground group-hover:scale-110 transition-transform mb-4" />
          <h3 className="font-semibold text-lg mb-1">ลากวิดีโอมาวางที่นี่</h3>
          <p className="text-sm text-muted-foreground mb-6">
            MP4, MOV (สูงสุด 500MB)
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("video-upload")?.click()}
            >
              เลือกไฟล์
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleYoutubeUrl}
            >
              <Link2 className="h-4 w-4 mr-1" />
              YouTube URL
            </Button>
          </div>

          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadVideo(file);
            }}
          />
        </div>

        {/* Progress */}
        {uploadProgress > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1">
                <Progress value={uploadProgress} className="h-2" />
              </div>
              <span className="text-sm font-mono">
                {Math.round(uploadProgress)}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              กำลังอัพโหลด...
            </p>
          </div>
        )}

        {/* Uploaded Video */}
        {uploadedVideo && (
          <div className="space-y-3 p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
              <div>
                <h4 className="font-semibold">อัพโหลดสำเร็จ!</h4>
                <p className="text-sm text-muted-foreground">
                  พร้อมใช้งานในบทเรียน
                </p>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm" className="flex-1">
                แก้ไข
              </Button>
              <Button className="flex-1" size="sm">
                ใช้ในบทเรียน
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
