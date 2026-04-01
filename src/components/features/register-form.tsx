"use client";

import { useForm } from "react-hook-form";
import { register as registerUser } from "@/lib/api/auth/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

type FormData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  accepted: boolean;
  role: "STUDENT" | "TEACHER";
};

export default function RegisterForm() {
  const router = useRouter();
  const t = useTranslations("auth.register");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      role: "STUDENT",
    },
  });

  const role = watch("role");

  const onSubmit = async (data: FormData) => {
    const { accepted, role, ...rest } = data;

    const mappedRole = role === "STUDENT" ? "USER" : "INSTRUCTOR";

    const payload = {
      ...rest,
      role: mappedRole,
    };

    try {
      await registerUser(payload);
      toast.success(t("successMessage"));
      router.push("/login");
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: {
            code?: string;
            message?: string;
          };
        };
      };

      const errorData = error.response?.data;

      if (errorData?.code === "EMAIL_EXISTS") {
        toast.error(t("emailExistsText"));
      } else {
        toast.error(errorData?.message || t("errorDefault"));
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
      <h2 className="text-xl font-semibold text-center mb-4">{t("title")}</h2>

      {/* ROLE */}
      <div className="flex gap-3 mb-6">
        <button
          type="button"
          onClick={() => setValue("role", "STUDENT")}
          className={`flex-1 p-3 rounded-xl border ${
            role === "STUDENT"
              ? "border-cyan-500 bg-cyan-50"
              : "border-gray-300"
          }`}
        >
          {t("roleStudent")}
        </button>

        <button
          type="button"
          onClick={() => setValue("role", "TEACHER")}
          className={`flex-1 p-3 rounded-xl border ${
            role === "TEACHER"
              ? "border-cyan-500 bg-cyan-50"
              : "border-gray-300"
          }`}
        >
          {t("roleTeacher")}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* fullname */}
        <div>
          <label className="block text-sm mb-1">{t("fullnameLabel")}</label>
          <input
            {...register("fullname", {
              required: t("fullnameRequired"),
            })}
            placeholder={t("fullnamePlaceholder")}
            className="input"
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm">{errors.fullname.message}</p>
          )}
        </div>

        {/* email */}
        <div>
          <label className="block text-sm mb-1">{t("emailLabel")}</label>
          <input
            {...register("email", {
              required: t("emailRequired"),
            })}
            className="input"
            placeholder={t("emailPlaceholder")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* password */}
        <div>
          <label className="block text-sm mb-1">{t("passwordLabel")}</label>
          <input
            type="password"
            {...register("password", {
              required: t("passwordRequired"),
              minLength: {
                value: 6,
                message: t("passwordMinLength"),
              },
            })}
            placeholder={t("passwordPlaceholder")}
            className="input"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* confirm password */}
        <div>
          <label className="block text-sm mb-1">{t("confirmPasswordLabel")}</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: t("confirmPasswordRequired"),
              validate: (value) =>
                value === watch("password") || t("confirmPasswordMismatch"),
            })}
            placeholder={t("confirmPasswordPlaceholder")}
            className="input"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* checkbox */}
        <div>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              {...register("accepted", {
                required: t("termsRequired"),
              })}
              className="mt-1"
            />
            <span>
              {t("termsLabel1")}
              <span className="text-cyan-500">{t("termsLink1")}</span> {t("termsLabel2")}
              <span className="text-cyan-500">{t("termsLink2")}</span>
            </span>
          </label>

          {errors.accepted && (
            <p className="text-red-500 text-sm mt-1">
              {errors.accepted.message}
            </p>
          )}
        </div>

        {/* button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-cyan-500 text-white py-3 rounded-xl hover:bg-cyan-600 disabled:bg-gray-400"
        >
          {isSubmitting ? t("submittingText") : t("submitButton")}
        </button>
      </form>

      <div className="text-center mt-4 text-sm">
        {t("hasAccountText")}{" "}
        <Link href="/login" className="text-cyan-500">
          {t("loginLink")}
        </Link>
      </div>
    </div>
  );
}
