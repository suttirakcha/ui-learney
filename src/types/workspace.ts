export type WorkspaceRole = "admin" | "instructor" | "student";

export type WorkspaceFieldOption = {
  label: string;
  value: string;
};

export type WorkspaceField = {
  key: string;
  label: string;
  type:
    | "hidden"
    | "text"
    | "textarea"
    | "number"
    | "email"
    | "password"
    | "url"
    | "date"
    | "select"
    | "checkbox"
    | "tags"
    | "json"
    | "color";
  required?: boolean;
  min?: number;
  max?: number;
  options?: WorkspaceFieldOption[];
};

export type WorkspaceForm = {
  action: string;
  submitLabel: string;
  fields: WorkspaceField[];
};

export type WorkspaceAction = {
  key: string;
  label: string;
  confirm?: boolean;
  variant?: "default" | "destructive";
};

export type WorkspaceCard = {
  key?: string;
  label: string;
  value: number | string;
};

export type WorkspaceChart = {
  key: string;
  title: string;
  type: "line" | "bar" | "pie";
  data: Array<Record<string, string | number>>;
};

export type WorkspaceSectionData = {
  title: string;
  description?: string;
  cards?: WorkspaceCard[];
  charts?: WorkspaceChart[];
  columns?: Array<{
    key: string;
    label: string;
    type?: "badge" | "currency" | "date" | "progress";
  }>;
  items?: Array<Record<string, unknown>>;
  rowActions?: WorkspaceAction[];
  bulkActions?: WorkspaceAction[];
  form?: WorkspaceForm;
  filters?: {
    statusOptions?: string[];
    categoryOptions?: string[];
    sortOptions?: string[];
  };
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  emptyState?: {
    title: string;
    description: string;
  };
  exportable?: string[];
  tabs?: string[];
  groups?: Array<Record<string, unknown>>;
  insights?: Array<{ title: string; value: number | string }>;
  anomaly?: Array<Record<string, unknown>>;
  reports?: Record<string, unknown>;
  latestReviews?: Array<Record<string, unknown>>;
  notifications?: Array<Record<string, unknown>>;
  tasks?: Array<Record<string, unknown>>;
  courses?: Array<Record<string, unknown>>;
  recentActivity?: Array<Record<string, unknown>>;
  recentTransactions?: Array<Record<string, unknown>>;
  alerts?: Array<Record<string, unknown>>;
  item?: Record<string, unknown> | null;
};

export type WorkspaceSession = {
  user: {
    id: string;
    fullname: string;
    email: string;
    image?: string | null;
    role: string;
    roles: string[];
    permissions: string[];
    preferredWorkspace: string;
    workspaceLabel: string;
    instructorProfile?: {
      id: string;
      displayName: string;
    } | null;
    latestInstructorApplication?: {
      id: string;
      status: string;
      displayName: string;
      createdAt: string;
    } | null;
  };
  workspaces: Array<{
    key: string;
    label: string;
    path: string;
  }>;
  unreadCounts: {
    admin: number;
    instructor: number;
    student: number;
  };
};

export type SkillExerciseDetail = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  score: number;
  timeLimitMinutes: number;
  passingScore: number;
  placement: string;
  courseName: string;
  questions: Array<{
    id: string;
    type: string;
    prompt: string;
    options?: unknown;
    explanation?: string | null;
    points: number;
    order: number;
  }>;
  latestAttempts: Array<{
    id: string;
    score?: number | null;
    maxScore?: number | null;
    passed?: boolean | null;
    submittedAt?: string | null;
  }>;
};

export type SkillExerciseSubmission = {
  id: string;
  score: number;
  maxScore: number;
  passed: boolean;
  feedback: Array<{
    questionId: string;
    isCorrect: boolean;
    explanation: string;
    points: number;
  }>;
  summary: string;
};

