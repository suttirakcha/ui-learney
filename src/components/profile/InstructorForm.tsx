"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";

export default function InstructorForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    expertise: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("ส่งไป backend:", form);

    // TODO: ยิง API
    // await fetchApi("/users/profile", "PATCH", form);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Instructor Settings</h2>

      <div className="space-y-4">
        <Input name="name" placeholder="Display Name" onChange={handleChange} />

        <Input name="email" placeholder="Email" onChange={handleChange} />

        <Textarea
          name="bio"
          placeholder="Professional Bio"
          onChange={handleChange}
        />

        <Input
          name="expertise"
          placeholder="Web Dev, React, Node.js"
          onChange={handleChange}
        />

        <Button onClick={handleSubmit} className="bg-cyan-500">
          บันทึกการเปลี่ยนแปลง
        </Button>
      </div>
    </div>
  );
}
