"use client";

import { useState } from "react";
import { register } from "@/lib/api/auth/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    // ✅ check terms
    if (!accepted) {
      setError("กรุณายอมรับข้อตกลงก่อนสมัคร");
      return;
    }

    // ✅ check password match
    if (form.password !== form.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await register(form);
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("สมัครสมาชิกไม่สำเร็จ");
      }
    } finally {
      // ✅ FIX สำคัญ
      setLoading(false);
    }
  };

  const isDisabled =
    !accepted ||
    loading ||
    !form.fullname ||
    !form.email ||
    !form.password ||
    !form.confirmPassword;

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
      {/* Logo */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-cyan-500">Leaney</h1>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-center">สมัครสมาชิก</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        สร้างบัญชีใหม่เพื่อเริ่มต้นการเรียนรู้
      </p>

      {/* Fullname */}
      <input
        className="w-full p-3 mb-4 border rounded-lg bg-gray-100"
        placeholder="ชื่อ-นามสกุล"
        onChange={(e) => setForm({ ...form, fullname: e.target.value })}
      />

      {/* Email */}
      <input
        className="w-full p-3 mb-4 border rounded-lg bg-gray-100"
        placeholder="example@email.com"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      {/* Password */}
      <input
        type="password"
        className="w-full p-3 mb-4 border rounded-lg bg-gray-100"
        placeholder="รหัสผ่าน"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      {/* Confirm Password */}
      <input
        type="password"
        className="w-full p-3 mb-2 border rounded-lg bg-gray-100"
        placeholder="ยืนยันรหัสผ่าน"
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />

      {/* Checkbox */}
      <div className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="w-4 h-4 accent-cyan-500"
        />
        <p className="text-sm text-gray-600">
          ฉันยอมรับ{" "}
          <span className="text-cyan-500 cursor-pointer">
            ข้อตกลงและเงื่อนไข
          </span>
        </p>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {/* Button */}
      <button
        onClick={handleRegister}
        disabled={isDisabled}
        className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 disabled:opacity-50"
      >
        {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
      </button>

      {/* Link */}
      <div className="flex justify-center mt-3 gap-1 text-sm">
        <p>มีบัญชีอยู่แล้ว?</p>
        <Link href="/login" className="text-cyan-500 hover:underline">
          เข้าสู่ระบบ
        </Link>
      </div>
    </div>
  );
}
