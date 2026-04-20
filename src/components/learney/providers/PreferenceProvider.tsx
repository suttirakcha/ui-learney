"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getBootstrapData } from "@/lib/api/experience.service";
import type { Locale } from "@/types/learney";

type BootstrapData = Awaited<ReturnType<typeof getBootstrapData>>;

type PreferenceContextValue = {
  locale: Locale;
  setLocale: (value: Locale) => void;
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
  seasonalThemeKey?: string | null;
};

const PreferenceContext = createContext<PreferenceContextValue | null>(null);

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

function applyThemeClass(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function applySeasonalTheme(assets?: Record<string, unknown> | null) {
  const root = document.documentElement;

  if (!assets) {
    root.style.removeProperty("--seasonal-accent");
    root.style.removeProperty("--seasonal-secondary");
    return;
  }

  const accent = typeof assets.accent === "string" ? assets.accent : "";
  const secondary = typeof assets.secondary === "string" ? assets.secondary : "";

  if (accent) {
    root.style.setProperty("--seasonal-accent", accent);
  }

  if (secondary) {
    root.style.setProperty("--seasonal-secondary", secondary);
  }
}

export function PreferenceProvider({
  children,
  initialLocale,
  initialTheme,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
  initialTheme: "light" | "dark";
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [theme, setThemeState] = useState<"light" | "dark">(initialTheme);
  const [seasonalThemeKey, setSeasonalThemeKey] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    applyThemeClass(theme);
    setCookie("learney-theme", theme);
  }, [theme]);

  useEffect(() => {
    setCookie("learney-locale", locale);
  }, [locale]);

  useEffect(() => {
    let mounted = true;

    getBootstrapData().then((data: BootstrapData) => {
      if (!mounted) {
        return;
      }

      setSeasonalThemeKey(data.activeTheme?.key ?? null);
      applySeasonalTheme(
        (data.activeTheme?.assets as Record<string, unknown> | null | undefined) ??
          null,
      );
    });

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<PreferenceContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => {
        setLocaleState(nextLocale);
        setCookie("learney-locale", nextLocale);
        router.refresh();
      },
      theme,
      setTheme: (nextTheme) => {
        setThemeState(nextTheme);
        setCookie("learney-theme", nextTheme);
      },
      seasonalThemeKey,
    }),
    [locale, router, seasonalThemeKey, theme],
  );

  return (
    <PreferenceContext.Provider value={value}>
      {children}
    </PreferenceContext.Provider>
  );
}

export function usePreference() {
  const context = useContext(PreferenceContext);

  if (!context) {
    throw new Error("usePreference must be used within PreferenceProvider");
  }

  return context;
}
