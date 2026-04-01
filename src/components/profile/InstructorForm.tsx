"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function InstructorForm() {
  const t = useTranslations("profile");
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    expertise: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("ส่งไป backend:", form);

    // TODO: ยิง API
    // await fetchApi("/users/profile", "PATCH", form);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{t("instructorSettings")}</h2>

      <div className="space-y-4">
        <Input name="name" placeholder={t("displayName")} onChange={handleChange} />

        <Input name="email" placeholder={t("email")} onChange={handleChange} />

        <Textarea
          name="bio"
          placeholder={t("professionalBio")}
          onChange={handleChange}
        />

        <Input
          name="expertise"
          placeholder={t("expertisePlaceholder")}
          onChange={handleChange}
        />

        <Button onClick={handleSubmit} className="bg-cyan-500">
          {t("saveChanges")}
        </Button>
      </div>
    </div>
  );
}
