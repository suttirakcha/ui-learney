"use client";

import { getStudentOverview } from "@/lib/api/profile/profile.service";
import type { StudentOverviewData } from "@/types/profile";
import { useEffect, useState } from "react";

type StudentOverviewState = {
  data: StudentOverviewData | null;
  error: string | null;
  loading: boolean;
};

export function useStudentOverview() {
  const [state, setState] = useState<StudentOverviewState>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadOverview() {
      try {
        const data = await getStudentOverview();

        if (isMounted) {
          setState({
            data,
            error: null,
            loading: false,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            error:
              error instanceof Error
                ? error.message
                : "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้",
            loading: false,
          });
        }
      }
    }

    void loadOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
