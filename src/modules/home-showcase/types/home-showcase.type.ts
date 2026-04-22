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
  textAlign: "left" | "center" | "right";
  mediaPosition: "left" | "right";
  enableAnimation: boolean;
  enableFloating: boolean;
  sortOrder: number;
  isActive: boolean;
  startsAt?: string | null;
  endsAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
