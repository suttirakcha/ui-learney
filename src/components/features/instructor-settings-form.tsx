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

  const onSubmit = (values: unknown) => {
    console.log(onSubmit);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 border border-accent rounded-xl"
    >
      <h2 className="text-2xl font-semibold">Instructor Settings</h2>
      <div className="space-y-1">
        <label className="block text-sm font-medium">Display name</label>
        <LnInput
          {...register("fullName")}
          placeholder="Enter your display name"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium">Email</label>
        <LnInput {...register("email")} placeholder="Enter your email" />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium">Professional bio</label>
        <LnTextarea
          {...register("bio")}
          placeholder="Enter your professional bio"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium">
          Expertise (comma separated)
        </label>
        <LnInput
          {...register("expertise")}
          placeholder="Enter your expertise with comma"
        />
      </div>
      <LnButton type="submit" className="mt-2">
        บันทึกการเปลี่ยนแปลง
      </LnButton>
    </form>
  );
}
