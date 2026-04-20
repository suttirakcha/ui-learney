"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API!;

export default function InstructorForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    expertise: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!form.name.trim() || !form.email.trim()) {
      setMessage("กรุณากรอกชื่อและอีเมล");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("UPDATE PROFILE ERROR:", text);
        setMessage("บันทึกข้อมูลไม่สำเร็จ");
        return;
      }

      setMessage("บันทึกข้อมูลสำเร็จ");
    } catch (error) {
      console.error("SUBMIT ERROR:", error);
      setMessage("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Instructor Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Display Name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <Textarea
          name="bio"
          placeholder="Professional Bio"
          value={form.bio}
          onChange={handleChange}
        />

        <Input
          name="expertise"
          placeholder="Web Dev, React, Node.js"
          value={form.expertise}
          onChange={handleChange}
        />

        {message && <p className="text-sm text-gray-600">{message}</p>}

        <Button type="submit" disabled={loading} className="bg-cyan-500">
          {loading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
        </Button>
      </form>
    </div>
  );
}
