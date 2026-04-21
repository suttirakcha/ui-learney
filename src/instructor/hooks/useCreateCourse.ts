import { useState } from "react";

import { fetchWithAuth } from "@/lib/api/fetchWithAuth";

export interface CreateCoursePayload {
  courseName: string;
  shortDescription?: string;
  description: string;
  category: string;
  level?: string;
  price?: number;
  videoPreview?: string;
  coverImage?: string;
  targetAudience?: string[];
  requirements?: string[];
  willLearnMessages?: string[];
  tags?: string[];
}

interface CourseMutationResponse {
  id: string;
}

interface UpdateCoursePayload {
  id: string;
  dto: CreateCoursePayload;
}

interface SubmitReviewPayload {
  id: string;
  notes: string;
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "Request failed";

    try {
      const payload = (await response.json()) as { message?: string | string[] };
      const rawMessage = payload.message;

      if (Array.isArray(rawMessage)) {
        message = rawMessage.join(", ");
      } else if (typeof rawMessage === "string" && rawMessage.trim()) {
        message = rawMessage;
      }
    } catch {
      const text = await response.text().catch(() => "");
      if (text.trim()) {
        message = text;
      }
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

function useAsyncTrigger<TArg, TResult>(
  handler: (arg: TArg) => Promise<TResult>,
) {
  const [isMutating, setIsMutating] = useState(false);

  return {
    isMutating,
    trigger: async (arg: TArg) => {
      setIsMutating(true);

      try {
        return await handler(arg);
      } finally {
        setIsMutating(false);
      }
    },
  };
}

export function useCreateCourse() {
  return useAsyncTrigger<CreateCoursePayload, CourseMutationResponse>(
    async (dto) => {
      const response = await fetchWithAuth("/instructor/courses", {
        method: "POST",
        body: JSON.stringify(dto),
      });

      return parseResponse<CourseMutationResponse>(response);
    },
  );
}

export function useUpdateCourse() {
  return useAsyncTrigger<UpdateCoursePayload, CourseMutationResponse>(
    async ({ id, dto }) => {
      const response = await fetchWithAuth(`/instructor/courses/${id}`, {
        method: "PATCH",
        body: JSON.stringify(dto),
      });

      return parseResponse<CourseMutationResponse>(response);
    },
  );
}

export function useSubmitReview() {
  return useAsyncTrigger<SubmitReviewPayload, { id: string }>(
    async ({ id, notes }) => {
      const response = await fetchWithAuth(
        `/instructor/courses/${id}/submit-review`,
        {
          method: "POST",
          body: JSON.stringify({ notes }),
        },
      );

      return parseResponse<{ id: string }>(response);
    },
  );
}
