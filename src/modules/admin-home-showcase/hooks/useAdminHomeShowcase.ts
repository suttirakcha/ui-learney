"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdminHomeShowcase,
  deleteAdminHomeShowcase,
  getAdminHomeShowcases,
  toggleAdminHomeShowcase,
  updateAdminHomeShowcase,
} from "../services/admin-home-showcase.service";
import type { HomeShowcaseMutationInput } from "@/modules/home-showcase/types/home-showcase.type";

const ADMIN_HOME_SHOWCASE_QUERY_KEY = ["admin-home-showcase"];

export function useAdminHomeShowcase() {
  const queryClient = useQueryClient();

  const refreshList = () =>
    queryClient.invalidateQueries({ queryKey: ADMIN_HOME_SHOWCASE_QUERY_KEY });

  const showcasesQuery = useQuery({
    queryKey: ADMIN_HOME_SHOWCASE_QUERY_KEY,
    queryFn: getAdminHomeShowcases,
    staleTime: 1000 * 30,
    retry: 1,
  });

  const saveMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id?: string | null;
      payload: HomeShowcaseMutationInput;
    }) => {
      if (id) {
        return updateAdminHomeShowcase(id, payload);
      }

      return createAdminHomeShowcase(payload);
    },
    onSuccess: refreshList,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminHomeShowcase,
    onSuccess: refreshList,
  });

  const toggleMutation = useMutation({
    mutationFn: toggleAdminHomeShowcase,
    onSuccess: refreshList,
  });

  return {
    showcasesQuery,
    saveMutation,
    deleteMutation,
    toggleMutation,
  };
}
