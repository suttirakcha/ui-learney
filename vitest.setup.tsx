/* eslint-disable @next/next/no-img-element */

import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: {
    alt: string;
    src: string | { src?: string };
    [key: string]: unknown;
  }) => {
    const imgProps = {
      ...props,
    } as React.ComponentPropsWithoutRef<"img"> & Record<string, unknown>;

    delete imgProps.fill;
    delete imgProps.priority;
    delete imgProps.sizes;

    return (
      <img
        alt={alt}
        src={typeof src === "string" ? src : (src?.src ?? "")}
        {...imgProps}
      />
    );
  },
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string | { pathname?: string };
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
    const linkProps = {
      ...props,
    } as React.ComponentPropsWithoutRef<"a"> & Record<string, unknown>;

    delete linkProps.prefetch;
    delete linkProps.replace;
    delete linkProps.scroll;
    delete linkProps.shallow;
    delete linkProps.locale;

    return (
      <a
        href={typeof href === "string" ? href : (href?.pathname ?? "")}
        {...linkProps}
      >
        {children}
      </a>
    );
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
