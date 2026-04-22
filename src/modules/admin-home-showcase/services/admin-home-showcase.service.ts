"use client";

import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import type {
  HomeShowcase,
  HomeShowcaseMutationInput,
} from "@/modules/home-showcase/types/home-showcase.type";

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = text ? (JSON.parse(text) as { message?: string }) : null;

  if (!response.ok) {
    throw new Error(data?.message || "Unable to complete home showcase request");
  }

  return data as T;
}

function toNullableText(value?: string | null) {
  if (typeof value !== "string") {
    return value ?? null;
  }

  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function toRequiredText(value: string, fieldLabel: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error(`${fieldLabel} is required`);
  }

  return trimmed;
}

function normalizeDateTime(value?: string | null, fieldLabel?: string) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) {
    return null;
  }

  const date = new Date(trimmed);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`${fieldLabel ?? "Date"} is invalid`);
  }

  return date.toISOString();
}

function normalizePayload(payload: HomeShowcaseMutationInput) {
  return {
    title: toRequiredText(payload.title, "Title"),
    subtitle: toNullableText(payload.subtitle),
    badge: toNullableText(payload.badge),
    description: toNullableText(payload.description),
    desktopImageUrl: toRequiredText(payload.desktopImageUrl, "Desktop image"),
    mobileImageUrl: toNullableText(payload.mobileImageUrl),
    primaryText: toNullableText(payload.primaryText),
    primaryHref: toNullableText(payload.primaryHref),
    secondaryText: toNullableText(payload.secondaryText),
    secondaryHref: toNullableText(payload.secondaryHref),
    overlayOpacity: Number(payload.overlayOpacity.toFixed(2)),
    textAlign: payload.textAlign,
    mediaPosition: payload.mediaPosition,
    enableAnimation: payload.enableAnimation,
    enableFloating: payload.enableFloating,
    sortOrder: Number.isFinite(payload.sortOrder) ? payload.sortOrder : 0,
    isActive: payload.isActive,
    startsAt: normalizeDateTime(payload.startsAt, "Start datetime"),
    endsAt: normalizeDateTime(payload.endsAt, "End datetime"),
  };
}

export async function getAdminHomeShowcases() {
  const response = await fetchWithAuth("/admin/home-showcase");
  return parseResponse<HomeShowcase[]>(response);
}

export async function createAdminHomeShowcase(
  payload: HomeShowcaseMutationInput,
) {
  const response = await fetchWithAuth("/admin/home-showcase", {
    method: "POST",
    body: JSON.stringify(normalizePayload(payload)),
  });

  return parseResponse<HomeShowcase>(response);
}

export async function updateAdminHomeShowcase(
  id: string,
  payload: HomeShowcaseMutationInput,
) {
  const response = await fetchWithAuth(`/admin/home-showcase/${id}`, {
    method: "PATCH",
    body: JSON.stringify(normalizePayload(payload)),
  });

  return parseResponse<HomeShowcase>(response);
}

export async function deleteAdminHomeShowcase(id: string) {
  const response = await fetchWithAuth(`/admin/home-showcase/${id}`, {
    method: "DELETE",
  });

  return parseResponse<HomeShowcase>(response);
}

export async function toggleAdminHomeShowcase(id: string) {
  const response = await fetchWithAuth(`/admin/home-showcase/${id}/toggle`, {
    method: "PATCH",
  });

  return parseResponse<HomeShowcase>(response);
}
