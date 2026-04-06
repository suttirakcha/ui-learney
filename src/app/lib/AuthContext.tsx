"use client";

import { clearAccessToken } from "@/lib/api/auth/auth-store";
import {
  logout as logoutRequest,
  refreshToken,
} from "@/lib/api/auth/auth.service";
import type { AuthenticatedUser } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";
import { setAccessToken } from "@/lib/api/auth/auth-store";

export type User = AuthenticatedUser;

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function getStoredUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser);

  useEffect(() => {
    let isMounted = true;

    async function syncSession() {
      try {
        const data = await refreshToken();
        setAccessToken(data.accessToken ?? null);
      } catch {
        clearAccessToken();
        localStorage.removeItem("user");

        if (isMounted) {
          setUser(null);
        }
      }
    }

    void syncSession();

    return () => {
      isMounted = false;
    };
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
