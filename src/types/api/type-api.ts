export interface ApiError {
  status: number; // HTTP status เช่น 401
  message: string; // message จาก backend
  code?: string; // optional (เผื่อ backend มี)
  data?: unknown; // raw data จาก backend
}
