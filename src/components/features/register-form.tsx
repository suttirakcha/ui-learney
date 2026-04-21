"use client";

import { useForm, useWatch } from "react-hook-form";
import { register as registerUser } from "@/lib/api/auth/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { isApiError } from "@/utils/isApiError";
import LearneyLogo from "../custom/LearneyLogo";

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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      role: "STUDENT",
    },
  });

  const role = useWatch({
    control,
    name: "role",
  });
  const password = useWatch({
    control,
    name: "password",
  });

  const onSubmit = async (data: FormData) => {
    const mappedRole = role === "STUDENT" ? "USER" : "INSTRUCTOR";
    const payload = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: mappedRole,
    };

    try {
      await registerUser(payload);
      toast.success("สมัครสมาชิกสำเร็จ 🎉");
      router.push("/login");
    } catch (err: unknown) {
      if (isApiError(err)) {
        if (err.code === "EMAIL_EXISTS") {
          toast.error("อีเมลนี้ถูกใช้ไปแล้ว");
        } else {
          toast.error(err.message);
        }
      } else {
        toast.error("สมัครไม่สำเร็จ");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <LearneyLogo />
      <div className="surface-card w-full max-w-md rounded-[1.75rem] p-8 shadow-[var(--shadow-soft)]">
        <h2 className="mb-4 text-center text-xl font-semibold text-foreground">สร้างบัญชี</h2>

        <div className="mb-6 flex gap-3">
          <button
            type="button"
            onClick={() => setValue("role", "STUDENT")}
            className={`flex-1 p-3 rounded-xl border ${
              role === "STUDENT"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background/70 text-muted-foreground hover:border-primary/40"
            }`}
          >
            นักเรียน
          </button>

          <button
            type="button"
            onClick={() => setValue("role", "TEACHER")}
            className={`flex-1 p-3 rounded-xl border ${
              role === "TEACHER"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background/70 text-muted-foreground hover:border-primary/40"
            }`}
          >
            ผู้สอน
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-foreground">ชื่อ-นามสกุล</label>
            <input
              {...register("fullname", {
                required: "กรุณากรอกชื่อ",
              })}
              className="h-11 w-full rounded-xl border border-input bg-background/80 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
              placeholder="ชื่อ-นามสกุล"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-foreground">อีเมล</label>
            <input
              {...register("email", {
                required: "กรุณากรอกอีเมล",
              })}
              className="h-11 w-full rounded-xl border border-input bg-background/80 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
              placeholder="Example@mail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-foreground">รหัสผ่าน</label>
            <input
              type="password"
              {...register("password", {
                required: "กรุณากรอกรหัสผ่าน",
                minLength: {
                  value: 6,
                  message: "รหัสผ่านอย่างน้อย 6 ตัว",
                },
              })}
              className="h-11 w-full rounded-xl border border-input bg-background/80 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
              placeholder="กรุณากรอกรหัสผ่าน"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-foreground">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "กรุณายืนยันรหัสผ่าน",
                validate: (value) => value === password || "รหัสผ่านไม่ตรงกัน",
              })}
              className="h-11 w-full rounded-xl border border-input bg-background/80 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
              placeholder="กรุณายืนยันรหัสผ่าน"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                {...register("accepted", {
                  required: "กรุณายอมรับข้อตกลง",
                })}
              />
              <span>
                ฉันยอมรับ{" "}
                <span className="text-primary">ข้อกำหนดการให้บริการ</span> และ{" "}
                <span className="text-primary">นโยบายความเป็นส่วนตัว</span>
              </span>
            </label>

            {errors.accepted && (
              <p className="text-red-500 text-sm mt-1">
                {errors.accepted.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gradient w-full rounded-xl py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          มีบัญชีแล้ว?{" "}
          <Link href="/login" className="font-semibold text-primary">
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}
