export type LoginResponse = {
  accessToken: string; // ⭐ สำคัญ
  user: {
    id: string;
    email: string;
    role: "ADMIN" | "USER" | "INSTRUCTOR";
  };
};
