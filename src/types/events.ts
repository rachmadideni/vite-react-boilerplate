import { User } from './index'

/**
 * Base structure for all event data
 * Includes metadata for tracking and debugging
 */
export interface BaseEventData<T> {
  payload: T
  timestamp: string
  requestId: string
  userId?: string
}

/**
 * Extended error event data with structured error information
 */
export interface BaseErrorEventData<T = void> extends BaseEventData<T> {
  error: {
    message: string
    status?: number
    code?: string
    details?: any
  }
}

/**
 * Dashboard statistics interface
 */
export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  revenue: number
  orders: number
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number
  limit: number
  total: number
}

/**
 * Central registry of all application events
 * Use strict namespacing: domain.action.status
 */
export interface EventMap {
  // Authentication events
  'auth.login.success': BaseEventData<{ user: User; token: string }>
  'auth.login.error': BaseErrorEventData<void>
  'auth.logout.success': BaseEventData<void>
  'auth.logout.error': BaseErrorEventData<void>
  'auth.me.loaded': BaseEventData<{ user: User }>
  'auth.me.error': BaseErrorEventData<void>

  // Dashboard events
  'dashboard.stats.loaded': BaseEventData<{ stats: DashboardStats }>
  'dashboard.stats.error': BaseErrorEventData<void>

  // User management events
  'users.list.loaded': BaseEventData<{ users: User[]; meta: PaginationMeta }>
  'users.list.error': BaseErrorEventData<void>
  'users.create.success': BaseEventData<{ user: User }>
  'users.create.error': BaseErrorEventData<void>
  'users.update.success': BaseEventData<{ user: User }>
  'users.update.error': BaseErrorEventData<void>
  'users.delete.success': BaseEventData<{ id: string }>
  'users.delete.error': BaseErrorEventData<void>
}

/**
 * Event middleware function type
 * Can transform data, add side effects, or prevent emission by returning false
 */
export type EventMiddleware = <K extends keyof EventMap>(
  event: K,
  data: EventMap[K],
  next: () => void
) => void | false

/**
 * Event handler function type
 */
export type EventHandler<K extends keyof EventMap> = (data: EventMap[K]) => void
