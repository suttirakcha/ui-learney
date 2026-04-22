export type HomeShowcaseTextAlign = "left" | "center" | "right";
export type HomeShowcaseMediaPosition = "left" | "right";

export interface HomeShowcase {
  id: string;
  title: string;
  subtitle?: string | null;
  badge?: string | null;
  description?: string | null;
  desktopImageUrl: string;
  mobileImageUrl?: string | null;
  primaryText?: string | null;
  primaryHref?: string | null;
  secondaryText?: string | null;
  secondaryHref?: string | null;
  overlayOpacity: number;
  textAlign: HomeShowcaseTextAlign;
  mediaPosition: HomeShowcaseMediaPosition;
  enableAnimation: boolean;
  enableFloating: boolean;
  sortOrder: number;
  isActive: boolean;
  startsAt?: string | null;
  endsAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HomeShowcaseMutationInput {
  title: string;
  subtitle?: string | null;
  badge?: string | null;
  description?: string | null;
  desktopImageUrl: string;
  mobileImageUrl?: string | null;
  primaryText?: string | null;
  primaryHref?: string | null;
  secondaryText?: string | null;
  secondaryHref?: string | null;
  overlayOpacity: number;
  textAlign: HomeShowcaseTextAlign;
  mediaPosition: HomeShowcaseMediaPosition;
  enableAnimation: boolean;
  enableFloating: boolean;
  sortOrder: number;
  isActive: boolean;
  startsAt?: string | null;
  endsAt?: string | null;
}

export interface HomeShowcaseCta {
  text: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface HomeShowcaseFallbackContent {
  badge: string;
  title: string;
  subtitle: string;
  primaryCta: HomeShowcaseCta;
  secondaryCta: HomeShowcaseCta;
}
