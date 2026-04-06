import { getProfileRolePresentation } from "@/lib/profile-role";
import { cn } from "@/lib/utils";
import type { Role } from "@/types/user";

interface ProfileRoleBadgeProps {
  role: Role;
  className?: string;
  variant?: "default" | "inverse";
}

export default function ProfileRoleBadge({
  role,
  className,
  variant = "default",
}: ProfileRoleBadgeProps) {
  const presentation = getProfileRolePresentation(role);

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-3 py-1 text-sm font-semibold",
        variant === "inverse"
          ? presentation.invertedBadgeClassName
          : presentation.badgeClassName,
        className,
      )}
    >
      {presentation.label}
    </span>
  );
}
