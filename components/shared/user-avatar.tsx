"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
} as const;

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  if (email) {
    return email[0].toUpperCase();
  }
  return "?";
}

export function UserAvatar({ user, className, size = "md" }: UserAvatarProps) {
  const initials = getInitials(user.name, user.email);

  return (
    <Avatar className={cn(SIZE_CLASSES[size], className)}>
      <AvatarImage src={user.image ?? undefined} alt={user.name ?? ""} />
      <AvatarFallback className="bg-terre font-sans font-bold text-white">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
