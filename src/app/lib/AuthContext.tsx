// "use client";

// import { createContext, useContext, useState } from "react";

// type User = {
//   name: string;
// };

// type AuthContextType = {
//   user: User | null;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(() => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       if (token) {
//         return { name: "User" }; // mock
//       }
//     }
//     return null;
//   });

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }

//   return context;
// };
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id?: string;
  name: string;
  email?: string;
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
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
