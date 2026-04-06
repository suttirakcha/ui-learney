import type { Role } from "@/types/user";

type ProfileRolePresentation = {
  label: string;
  description: string;
  badgeClassName: string;
  invertedBadgeClassName: string;
};

const ROLE_PRESENTATIONS: Record<Role, ProfileRolePresentation> = {
  USER: {
    label: "ผู้เรียน (USER)",
    description: "โปรไฟล์ผู้เรียน",
    badgeClassName: "border-sky-200 bg-sky-100 text-sky-800",
    invertedBadgeClassName:
      "border-sky-200/40 bg-sky-400/20 text-sky-50 backdrop-blur-sm",
  },
  INSTRUCTOR: {
    label: "ผู้สอน (INSTRUCTOR)",
    description: "โปรไฟล์ผู้สอน",
    badgeClassName: "border-amber-200 bg-amber-100 text-amber-800",
    invertedBadgeClassName:
      "border-amber-200/40 bg-amber-400/20 text-amber-50 backdrop-blur-sm",
  },
  ADMIN: {
    label: "ผู้ดูแลระบบ (ADMIN)",
    description: "โปรไฟล์ผู้ดูแลระบบ",
    badgeClassName: "border-rose-200 bg-rose-100 text-rose-800",
    invertedBadgeClassName:
      "border-rose-200/40 bg-rose-400/20 text-rose-50 backdrop-blur-sm",
  },
};

export function getProfileRolePresentation(role: Role) {
  return ROLE_PRESENTATIONS[role];
}
