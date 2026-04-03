"use client";

import { clearAccessToken } from "@/lib/api/auth/auth-store";
import { Role } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id?: string;
  fullname: string;
  image?: string;
  email?: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void; // ✅ เพิ่ม
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // ✅ โหลด user จาก localStorage ตอนเปิดเว็บ
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const logout = () => {
    clearAccessToken();
    // localStorage.removeItem("token");
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    // sessionStorage.removeItem("token");
    setUser(null);

    // redirect ไป login
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
