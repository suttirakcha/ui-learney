import { useQuery } from "@tanstack/react-query";
import { getActiveHomeShowcase } from "../services/home-showcase.service";
import type { HomeShowcase } from "../types/home-showcase.type";

export function useHomeShowcase(initialData?: HomeShowcase | null) {
  return useQuery<HomeShowcase | null>({
    queryKey: ["home-showcase", "active"],
    queryFn: getActiveHomeShowcase,
    initialData,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
