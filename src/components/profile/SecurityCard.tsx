"use client";

import { changeMyPassword } from "@/lib/api/profile/profile.service";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function SecurityCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("กรุณากรอกรหัสผ่านให้ครบ");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      setIsSaving(true);
      const response = await changeMyPassword({
        currentPassword,
        newPassword,
      });

      toast.success(response.message || "เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
      resetForm();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "ไม่สามารถเปลี่ยนรหัสผ่านได้",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-6 rounded-xl border border-accent">
      <h2 className="text-2xl font-semibold">ความปลอดภัย</h2>
      <div className="p-6 rounded-xl border border-accent space-y-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-3 items-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <Lock className="text-primary w-6 h-6" />
            </div>

            <div>
              <p className="font-medium">เปลี่ยนรหัสผ่าน</p>
              <p className="text-sm text-gray-500">
                อัปเดตรหัสผ่านเพื่อให้บัญชีของคุณปลอดภัยอยู่เสมอ
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (isEditing) {
                resetForm();
                return;
              }

              setIsEditing(true);
            }}
          >
            {isEditing ? "ยกเลิก" : "แก้ไข"}
          </Button>
        </div>

        {isEditing && (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">รหัสผ่านปัจจุบัน</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">รหัสผ่านใหม่</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ยืนยันรหัสผ่านใหม่</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <div className="md:col-span-3">
              <Button type="button" disabled={isSaving} onClick={handleSubmit}>
                {isSaving ? "กำลังบันทึก..." : "บันทึกรหัสผ่านใหม่"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
