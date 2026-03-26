"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const baseStyle = "px-5 py-2 rounded-md font-medium transition duration-200";

  const styles = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black border hover:bg-gray-100",
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${styles[variant]}`}>
      {children}
    </button>
  );
}
