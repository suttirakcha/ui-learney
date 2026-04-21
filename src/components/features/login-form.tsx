"use client";

import { useState, useEffect } from "react";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { pickLocalized } from "@/lib/learney";
import { login } from "@/lib/api/auth/auth.service";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useAuth } from "@/app/lib/AuthContext";
import LearneyLogo from "../custom/LearneyLogo";
import { setAccessToken } from "@/lib/api/auth/auth-store";

export default function LoginForm() {
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedRole, setSavedRole] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { locale } = usePreference();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr);
          setSavedRole(user.role || null);
        }
      } catch {
        setSavedRole(null);
      }
    }
  }, []);

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

      setAccessToken(res.accessToken ?? null);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);

      toast.success(
        pickLocalized(
          { th: "เข้าสู่ระบบสำเร็จ 🎉", en: "Login successful 🎉" },
          locale,
        ),
      );

      const destination =
        res.user.role === "ADMIN"
          ? "/admin"
          : res.user.role === "INSTRUCTOR"
            ? "/instructor/dashboard"
            : "/profile";

      window.location.assign(destination);
    } catch (err: unknown) {
      const error = err as { message?: string };
      const message =
        error.message &&
        /load failed|failed to fetch|networkerror/i.test(error.message)
          ? "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาตรวจสอบว่าเปิด API อยู่ และใช้ localhost หรือ 127.0.0.1 ให้ตรงกัน"
          : error.message || "เข้าสู่ระบบไม่สำเร็จ";

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel soft-surface max-w-md w-full p-10 rounded-3xl shadow-2xl animate-fadeIn">
      <div className="flex items-center justify-center gap-2 mb-4">
        <LearneyLogo />
      </div>

      <h2 className="text-xl font-semibold text-center">
        {pickLocalized(
          { th: "ยินดีต้อนรับกลับมา", en: "Welcome back" },
          locale,
        )}
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        {savedRole
          ? pickLocalized(
              {
                th: `เข้าสู่ระบบเพื่อจัดการ ${savedRole === "ADMIN" ? "แอดมิน" : savedRole === "INSTRUCTOR" ? "ผู้สอน" : "นักเรียน"}`,
                en: `Sign in to manage your ${savedRole === "ADMIN" ? "admin" : savedRole === "INSTRUCTOR" ? "instructor" : "student"}`,
              },
              locale,
            )
          : pickLocalized(
              {
                th: "เข้าสู่ระบบเพื่อเรียนต่อ",
                en: "Sign in to continue learning",
              },
              locale,
            )}
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {pickLocalized({ th: "ที่อยู่อีเมล", en: "Email address" }, locale)}
        </label>
        <input
          className="input placeholder:text-gray-400"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">
          {pickLocalized({ th: "รหัสผ่าน", en: "Password" }, locale)}
        </label>
        <input
          type="password"
          className="input placeholder:text-gray-400"
          placeholder="ป้อนรหัสผ่าน"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
        />

        {errorMessage && (
          <p className="text-destructive text-sm mt-2 p-2 bg-destructive/10 rounded-lg border border-destructive/30 animate-fadeIn">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mb-4 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          {pickLocalized({ th: "จดจำฉัน", en: "Remember me" }, locale)}
        </label>

        <Link
          href="/forgot-password"
          className="text-primary hover:text-primary underline-offset-4 hover:underline font-medium"
        >
          {pickLocalized(
            { th: "ลืมรหัสผ่าน?", en: "Forgot password?" },
            locale,
          )}
        </Link>
      </div>

      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary via-primary/95 to-primary-foreground text-primary py-3 rounded-2xl hover:from-primary-foreground/90 hover:shadow-2xl hover:shadow-primary/40 glass-panel transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed animate-fadeIn ring-2 ring-primary/20 hover:ring-primary/40"
      >
        {pickLocalized(
          {
            th: loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ",
            en: loading ? "Signing in..." : "Sign in",
          },
          locale,
        )}
      </button>

      <div className="flex items-center my-8 text-muted-foreground text-sm">
        <div className="flex-1 h-px bg-border/50"></div>
        <span className="px-3">
          {pickLocalized({ th: "หรือ", en: "or" }, locale)}
        </span>
        <div className="flex-1 h-px bg-border/50"></div>
      </div>

      <div className="text-center text-sm">
        {pickLocalized(
          { th: "ยังไม่มีบัญชี?", en: "Don't have an account?" },
          locale,
        )}{" "}
        <Link
          href="/register"
          className="text-primary font-semibold hover:text-primary underline-offset-4 hover:underline"
        >
          {pickLocalized({ th: "สมัครสมาชิก", en: "Sign up" }, locale)}
        </Link>
      </div>
    </div>
  );
}
