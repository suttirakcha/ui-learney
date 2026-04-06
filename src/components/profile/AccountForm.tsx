"use client";

import { useAuth } from "@/app/lib/AuthContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateMyProfile } from "@/lib/api/profile/profile.service";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-hot-toast";

interface AccountFormProps {
  defaultFullname?: string;
  defaultEmail?: string;
  defaultPhone?: string;
  defaultImage?: string;
  title?: string;
}

export default function AccountForm({
  defaultFullname = "สมชาย นักเรียน",
  defaultEmail = "student@learney.com",
  defaultPhone = "",
  defaultImage = "",
  title = "การตั้งค่าบัญชี",
}: AccountFormProps) {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    fullname: defaultFullname,
    email: defaultEmail,
    phone: defaultPhone,
    image: defaultImage,
  });
  const [bio, setBio] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setForm({
      fullname: user?.fullname ?? defaultFullname,
      email: user?.email ?? defaultEmail,
      phone: user?.phone ?? defaultPhone,
      image: user?.image ?? defaultImage,
    });
  }, [
    defaultEmail,
    defaultFullname,
    defaultImage,
    defaultPhone,
    user?.email,
    user?.fullname,
    user?.image,
    user?.phone,
  ]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullname.trim() || !form.email.trim()) {
      toast.error("กรุณากรอกชื่อและอีเมลให้ครบ");
      return;
    }

    try {
      setIsSaving(true);

      const updatedUser = await updateMyProfile({
        fullname: form.fullname.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        image: form.image.trim(),
      });

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "ไม่สามารถบันทึกข้อมูลโปรไฟล์ได้",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm space-y-4"
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      {form.image.trim() && (
        <div className="flex items-center gap-4 rounded-xl border border-accent p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={form.image}
            alt={form.fullname || "profile-image"}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">ตัวอย่างรูปโปรไฟล์</p>
            <p className="text-sm text-muted-foreground">
              รูปนี้จะแสดงบนหน้าโปรไฟล์ของคุณ
            </p>
          </div>
        </div>
      )}

      <div>
        <label className="text-sm">ชื่อ - นามสกุล</label>
        <Input
          value={form.fullname}
          onChange={(event) =>
            setForm((currentForm) => ({
              ...currentForm,
              fullname: event.target.value,
            }))
          }
        />
      </div>

      <div>
        <label className="text-sm">อีเมล</label>
        <Input
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm((currentForm) => ({
              ...currentForm,
              email: event.target.value,
            }))
          }
        />
      </div>

      <div>
        <label className="text-sm">เบอร์โทร</label>
        <Input
          placeholder="เช่น 0812345678"
          value={form.phone}
          onChange={(event) =>
            setForm((currentForm) => ({
              ...currentForm,
              phone: event.target.value,
            }))
          }
        />
      </div>

      <div>
        <label className="text-sm">ลิงก์รูปโปรไฟล์</label>
        <Input
          placeholder="https://example.com/avatar.jpg"
          value={form.image}
          onChange={(event) =>
            setForm((currentForm) => ({
              ...currentForm,
              image: event.target.value,
            }))
          }
        />
      </div>

      <div>
        <label className="text-sm">แนะนำตัว</label>
        <Textarea
          placeholder="บอกเราสักนิดเกี่ยวกับตัวคุณ"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          ช่องนี้ยังเป็นข้อมูลแสดงผลชั่วคราว และยังไม่ได้บันทึกลงระบบในรอบนี้
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSaving}
        className="bg-cyan-500 hover:bg-cyan-600"
      >
        {isSaving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
      </Button>
    </form>
  );
}
