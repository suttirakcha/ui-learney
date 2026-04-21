import { ThemeProvider as ThemeContextProvider } from "@/contexts/ThemeContext";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function ThemeProvider({ children }: Props) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
