"use client";

import { useForm } from "react-hook-form";
import LnInput from "../custom/LnInput";
import LnButton from "../custom/LnButton";
import LnTextarea from "../custom/LnTextarea";

const initialValues = {
  fullName: "",
  email: "",
  bio: "",
  expertise: "",
};

export default function InstructorSettingsForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 border border-accent rounded-xl"
    >
      <h2 className="text-2xl font-semibold">การตั้งค่าผู้สอน</h2>
      <div className="space-y-1">
        <label className="block text-sm font-medium">ชื่อที่แสดง</label>
        <LnInput {...register("fullName")} placeholder="กรอกชื่อที่ต้องการแสดง" />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium">อีเมล</label>
        <LnInput {...register("email")} placeholder="กรอกอีเมลของคุณ" />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium">ประวัติผู้สอน</label>
        <LnTextarea {...register("bio")} placeholder="แนะนำตัวและประสบการณ์ของคุณ" />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium">ความเชี่ยวชาญ (คั่นด้วย comma)</label>
        <LnInput
          {...register("expertise")}
          placeholder="เช่น Frontend, React, UI Design"
        />
      </div>
      <LnButton type="submit" className="mt-2">
        บันทึกการเปลี่ยนแปลง
      </LnButton>
    </form>
  );
}
