"use client";

import { useState } from "react";
import { login } from "@/lib/api/auth/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
      {/* Logo */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-cyan-500">Leaney</h1>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-center">เข้าสู่ระบบ</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        ยินดีต้อนรับกลับมา! กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ
      </p>

      {/* Email */}
      <input
        className="w-full p-3 mb-4 border rounded-lg bg-gray-100"
        placeholder="example@email.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        type="password"
        className="w-full p-3 mb-4 border rounded-lg bg-gray-100"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={handleLogin}
        className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600"
      >
        เข้าสู่ระบบ
      </button>
      <div className="flex justify-center mt-3">
        <p>ยังไม่มีบัญชี? </p>
        <Link href="/register" className="hover:text-blue-500">
          สมัครสมาชิก
        </Link>
      </div>
    </div>
  );
}
