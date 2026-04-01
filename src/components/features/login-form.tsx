"use client";

import { useState } from "react";
import { login } from "@/lib/api/auth/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useAuth } from "@/app/lib/AuthContext";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const t = useTranslations("auth.login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email || !password) {
      const msg = t("errorIncomplete");
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    try {
      setLoading(true);

      const res = await login({ email, password });

      if (remember) {
        localStorage.setItem("token", res.token);
      } else {
        sessionStorage.setItem("token", res.token);
      }

      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);

      toast.success(t("successMessage"));

      router.push("/");
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      const message = error.response?.data?.message || t("errorDefault");

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-10 h-10 bg-cyan-400 rounded-lg"></div>
        <h1 className="text-xl font-bold">Learny</h1>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-center">{t("title")}</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        {t("subtitle")}
      </p>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">{t("emailLabel")}</label>
        <input
          className="input placeholder:text-gray-400"
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
        />
      </div>

      {/* Password */}
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">{t("passwordLabel")}</label>
        <input
          type="password"
          className="input placeholder:text-gray-400"
          placeholder={t("passwordPlaceholder")}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          {t("rememberMe")}
        </label>

        <span className="text-cyan-500 hover:underline cursor-pointer">
          {t("forgotPassword")}
        </span>
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-cyan-500 text-white py-3 rounded-xl hover:bg-cyan-600 transition disabled:bg-gray-400"
      >
        {loading ? t("submittingText") : t("submitButton")}
      </button>

      {/* Divider */}
      <div className="flex items-center my-6 text-gray-400 text-sm">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="px-3">{t("orText")}</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Register */}
      <div className="text-center text-sm">
        {t("noAccountText")}{" "}
        <Link href="/register" className="text-cyan-500 hover:underline">
          {t("registerLink")}
        </Link>
      </div>
    </div>
  );
}
