"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast"; // ✅ เพิ่ม

import { createCourse } from "@/lib/api/course/course.service";
import { CreateCoursePayload } from "@/types/conse/create-course.type";
import { uploadVideo } from "@/lib/api/upload/upload.service";

export default function CreateCourseForm() {
  const router = useRouter();

  const [form, setForm] = useState<CreateCoursePayload>({
    courseName: "",
    description: "",
    category: "",
    price: 0,
    tags: [],
    thumbnail: "",
    videoPreview: "",
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!form.courseName) {
        toast.error("กรอกชื่อคอร์ส");
        return;
      }

      if (!form.description) {
        toast.error("กรอกรายละเอียด");
        return;
      }

      setLoading(true);

      let videoUrl: string = "";

      // 🎥 upload video
      if (videoFile) {
        toast.loading("กำลังอัปโหลดวิดีโอ...", { id: "upload" });
        videoUrl = await uploadVideo(videoFile);
        toast.success("อัปโหลดวิดีโอสำเร็จ", { id: "upload" });
      }

      toast.loading("กำลังสร้างคอร์ส...", { id: "create" });

      await createCourse({
        ...form,
        videoPreview: videoUrl,
      });

      toast.success("✅ ส่งคอร์สเรียบร้อย!", { id: "create" });

      router.push("/instructor/dashboard");
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("เกิดข้อผิดพลาด");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* LEFT */}
        <div className="col-span-2 space-y-6">
          {/* BASIC */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="font-semibold text-lg">📘 ข้อมูลพื้นฐาน</h2>

            <input
              placeholder="เช่น React ตั้งแต่ 0 ถึงโปร"
              className="w-full border rounded-lg p-2"
              onChange={(e) => setForm({ ...form, courseName: e.target.value })}
            />

            <textarea
              className="w-full border rounded-lg p-2"
              rows={4}
              placeholder="รายละเอียด"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="หมวดหมู่"
                className="border p-2 rounded-lg"
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />

              <input
                placeholder="Tags (a,b,c)"
                className="border p-2 rounded-lg"
                onChange={(e) =>
                  setForm({
                    ...form,
                    tags: e.target.value.split(",").map((t) => t.trim()),
                  })
                }
              />
            </div>
          </div>

          {/* PRICE */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-lg mb-2">💰 ราคาคอร์ส</h2>

            <input
              type="number"
              className="w-full border rounded-lg p-2"
              onChange={(e) =>
                setForm({
                  ...form,
                  price: Number(e.target.value) || 0,
                })
              }
            />
          </div>

          {/* THUMBNAIL */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="font-semibold text-lg">🖼 รูปปกคอร์ส</h2>

            <input
              placeholder="ใส่ URL รูป"
              className="w-full border rounded-lg p-2"
              onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
            />

            {form.thumbnail && (
              <Image
                src={form.thumbnail}
                alt="thumbnail"
                width={500}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>

          {/* VIDEO */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="font-semibold text-lg">🎥 วิดีโอแนะนำคอร์ส</h2>

            <input
              type="file"
              accept="video/*"
              className="w-full border rounded-lg p-2"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setVideoFile(file);
              }}
            />

            {videoFile && (
              <p className="text-sm text-gray-500">
                เลือกไฟล์: {videoFile.name}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="bg-cyan-50 p-6 rounded-xl border">
            <h3 className="font-semibold mb-2">ขั้นตอนการลงคอร์ส</h3>

            <ul className="text-sm space-y-2">
              <li>1. กรอกข้อมูล</li>
              <li>2. ส่งตรวจสอบ</li>
              <li>3. Admin อนุมัติ</li>
            </ul>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 w-full bg-cyan-500 text-white py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "กำลังส่ง..." : "ส่งเพื่อตรวจสอบ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
