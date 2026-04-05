"use client";

import { clearAccessToken } from "@/lib/api/auth/auth-store";
import { logout as logoutRequest } from "@/lib/api/auth/auth.service";
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
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

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

  const logout = async () => {
    try {
      await logoutRequest();
    } catch {
      // Ignore logout request failures and clear the local session anyway.
    }

    clearAccessToken();

    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }

    setUser(null);
    window.location.assign("/login");
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
