"use client";

import { useState } from "react";
import { login } from "@/lib/api/auth/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useAuth } from "@/app/lib/AuthContext"; // ✅ เพิ่ม

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth(); // ✅ เพิ่ม

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email || !password) {
      const msg = "กรุณากรอกข้อมูลให้ครบ";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    try {
      setLoading(true);

      const res = await login({ email, password });

      if (!res?.accessToken) {
        throw new Error("Login failed");
      }

      // ✅ เก็บ user + set context
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);

      toast.success("เข้าสู่ระบบสำเร็จ 🎉");

      if (res.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const error = err as { message?: string };

      const message = error.message || "เข้าสู่ระบบไม่สำเร็จ";

      setErrorMessage(message);
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-10 h-10 bg-cyan-400 rounded-lg"></div>
        <h1 className="text-xl font-bold">Learny</h1>
      </div>

      <h2 className="text-xl font-semibold text-center">ยินดีต้อนรับกลับมา</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        เข้าสู่ระบบเพื่อเรียนต่อ
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">ที่อยู่อีเมล</label>
        <input
          className="input placeholder:text-gray-400"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
            setErrorMessage("");
          }}
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">รหัสผ่าน</label>
        <input
          type="password"
          className="input placeholder:text-gray-400"
          placeholder="ป้อนรหัสผ่าน"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
            setErrorMessage("");
          }}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>

      <div className="flex items-center justify-between mb-4 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          จดจำฉัน
        </label>

        <span className="text-cyan-500 hover:underline cursor-pointer">
          ลืมรหัสผ่าน?
        </span>
      </div>

      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-cyan-500 text-white py-3 rounded-xl hover:bg-cyan-600 transition disabled:bg-gray-400"
      >
        {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
      </button>

      <div className="flex items-center my-6 text-gray-400 text-sm">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="px-3">หรือ</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <div className="text-center text-sm">
        ยังไม่มีบัญชี?{" "}
        <Link href="/register" className="text-cyan-500 hover:underline">
          สมัครสมาชิก
        </Link>
      </div>
    </div>
  );
}
