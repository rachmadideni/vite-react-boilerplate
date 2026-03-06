// ─── API Response Types ──────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  code: string
  statusCode: number
}

// ─── Common Types ─────────────────────────────────────────────────────────────

export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type AsyncFn<T = void> = () => Promise<T>

export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
}

// ─── User Types ───────────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  createdAt: string
}
