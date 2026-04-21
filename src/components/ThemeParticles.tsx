"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeParticles() {
  const { theme } = useTheme();

  const getParticles = () => {
    switch (theme) {
      case "songkran":
        return (
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={`bubble-${i}`}
                className="absolute w-4 h-4 bg-[var(--particle-bg)] rounded-full opacity-60 blur-sm"
                style={{ left: `${10 + i * 8}%`, top: `${20 + i * 5}%` }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        );
      case "new_year":
        return (
          <>
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute w-2 h-2 bg-[var(--seasonal-accent)] opacity-80"
                style={{ left: `${5 + i * 6}%`, top: `${10 + i * 4}%` }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 360],
                  opacity: [0.8, 0.2, 0.8],
                }}
                transition={{ duration: 5 + i * 0.2, repeat: Infinity }}
              />
            ))}
          </>
        );
      default:
        return (
          <>
            <motion.div
              className="orb1 absolute inset-0 opacity-20"
              animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
            />
            <motion.div
              className="orb2 absolute inset-0 opacity-15"
              animate={{ scale: [1, 1.05, 1], x: [0, -15, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
            />
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {getParticles()}
    </div>
  );
}
