import { fetchWithAuth } from "./fetchWithAuth";
import type {
  SkillExerciseDetail,
  SkillExerciseSubmission,
  WorkspaceRole,
  WorkspaceSectionData,
  WorkspaceSession,
} from "@/types/workspace";

export class WorkspaceApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "WorkspaceApiError";
    this.status = status;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = text ? (JSON.parse(text) as unknown) : {};

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "เกิดข้อผิดพลาดในการเชื่อมต่อข้อมูล";

    throw new WorkspaceApiError(response.status, message);
  }

  return data as T;
}

function roleSegment(role: WorkspaceRole) {
  return role;
}

export async function getWorkspaceSession() {
  const response = await fetchWithAuth("/workspace/session");
  return parseResponse<WorkspaceSession>(response);
}

export async function getWorkspaceOverview(role: WorkspaceRole) {
  const response = await fetchWithAuth(`/workspace/${roleSegment(role)}/overview`);
  return parseResponse<WorkspaceSectionData>(response);
}

export async function getWorkspaceSection(
  role: WorkspaceRole,
  section: string,
  queryString = "",
) {
  const suffix = queryString ? `?${queryString}` : "";
  const response = await fetchWithAuth(
    `/workspace/${roleSegment(role)}/${section}${suffix}`,
  );
  return parseResponse<WorkspaceSectionData>(response);
}

export async function applyWorkspaceAction(
  role: WorkspaceRole,
  section: string,
  action: string,
  payload?: Record<string, unknown>,
) {
  const response = await fetchWithAuth(
    `/workspace/${roleSegment(role)}/${section}/actions`,
    {
      method: "POST",
      body: JSON.stringify({
        action,
        payload,
      }),
    },
  );

  return parseResponse<{ message: string }>(response);
}

export async function getStudentExerciseDetail(exerciseId: string) {
  const response = await fetchWithAuth(`/workspace/student/exercises/${exerciseId}`);
  return parseResponse<SkillExerciseDetail>(response);
}

export async function submitStudentExerciseAttempt(
  exerciseId: string,
  answers: Record<string, unknown>,
) {
  const response = await fetchWithAuth(
    `/workspace/student/exercises/${exerciseId}/attempts`,
    {
      method: "POST",
      body: JSON.stringify({
        action: "submit_attempt",
        payload: { answers },
      }),
    },
  );

  return parseResponse<SkillExerciseSubmission>(response);
}

