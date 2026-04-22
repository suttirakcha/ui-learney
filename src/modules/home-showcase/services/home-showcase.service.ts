import { fetchApi } from "@/lib/api/fetchApi";
import type { HomeShowcase } from "../types/home-showcase.type";

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();

  if (!response.ok) {
    let message = "Failed to load home showcase";

    try {
      const data = text ? (JSON.parse(text) as { message?: string }) : null;
      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Ignore malformed error bodies and fall back to the default message.
    }

    throw new Error(message);
  }

  if (!text) {
    return null as T;
  }

  return JSON.parse(text) as T;
}

export async function getActiveHomeShowcase(): Promise<HomeShowcase | null> {
  const response = await fetchApi("/home/showcase/active");
  return parseResponse<HomeShowcase | null>(response);
}
