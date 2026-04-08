"use client";

import { clearAccessToken } from "@/lib/api/auth/auth-store";
import {
  logout as logoutRequest,
  refreshToken,
} from "@/lib/api/auth/auth.service";
import { setAccessToken } from "@/lib/api/auth/auth-store";
import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import type { AuthenticatedUser } from "@/types/user";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

export type User = AuthenticatedUser;

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function syncSession() {
      const storedUser = getStoredUser();

      if (isMounted) {
        setUser(storedUser);
      }

      try {
        const data = await refreshToken();
        setAccessToken(data.accessToken ?? null);
      } catch {
        clearAccessToken();

        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
        }

        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void syncSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const refetchUser = useCallback(async () => {
    const res = await fetchWithAuth("/users/me");
    const updatedUser = (await res.json()) as User;
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
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
    <AuthContext.Provider
      value={{ user, isLoading, setUser, logout, refetchUser }}
    >
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
