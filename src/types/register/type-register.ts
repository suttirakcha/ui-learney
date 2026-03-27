export type RegisterFormData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  accepted: boolean;
  role: "STUDENT" | "TEACHER"; // ✅ เพิ่ม
};
