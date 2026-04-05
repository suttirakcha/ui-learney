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
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-center mb-4">สร้างบัญชี</h2>

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
            นักเรียน
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
            ผู้สอน
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">ชื่อ-นามสกุล</label>
            <input
              {...register("fullname", {
                required: "กรุณากรอกชื่อ",
              })}
              className="input"
              placeholder="ชื่อ-นามสกุล"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">อีเมล</label>
            <input
              {...register("email", {
                required: "กรุณากรอกอีเมล",
              })}
              className="input"
              placeholder="Example@mail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">รหัสผ่าน</label>
            <input
              type="password"
              {...register("password", {
                required: "กรุณากรอกรหัสผ่าน",
                minLength: {
                  value: 6,
                  message: "รหัสผ่านอย่างน้อย 6 ตัว",
                },
              })}
              className="input"
              placeholder="กรุณากรอกรหัสผ่าน"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "กรุณายืนยันรหัสผ่าน",
                validate: (value) =>
                  value === password || "รหัสผ่านไม่ตรงกัน",
              })}
              className="input"
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
                <span className="text-cyan-500">ข้อกำหนดการให้บริการ</span> และ{" "}
                <span className="text-cyan-500">นโยบายความเป็นส่วนตัว</span>
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
            className="w-full bg-cyan-500 text-white py-3 rounded-xl"
          >
            {isSubmitting ? "กำลังสมัคร..." : "สมัครสมาชิก"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          มีบัญชีแล้ว?{" "}
          <Link href="/login" className="text-cyan-500">
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}
