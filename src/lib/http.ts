import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@store/auth.store'
import { eventBus } from './eventBus'
import { generateRequestId } from './utils/generateRequestId'
import type { BaseEventData, BaseErrorEventData } from '@/types/events'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000

// Extend axios config to include metadata
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    metadata?: {
      requestId: string
      requestTimestamp: number
    }
  }
}

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor — attach auth token and tracking metadata
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Attach request metadata for tracking
    config.metadata = {
      requestId: generateRequestId(),
      requestTimestamp: Date.now(),
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle errors globally and emit events
http.interceptors.response.use(
  (response) => {
    // Extract metadata from request
    const requestId = response.config.metadata?.requestId || 'unknown'
    const userId = useAuthStore.getState().user?.id

    // Emit success events based on endpoint
    emitSuccessEvent(response.config.url || '', response.data, requestId, userId)

    return response
  },
  (error: AxiosError) => {
    // Extract metadata from request
    const requestId = error.config?.metadata?.requestId || 'unknown'
    const userId = useAuthStore.getState().user?.id

    // Emit error events based on endpoint
    emitErrorEvent(error.config?.url || '', error, requestId, userId)

    // Only redirect to login on 401 if we're NOT already on the login page
    // and if it's not a login attempt itself
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes('/auth/login')
      const isOnLoginPage = window.location.pathname === '/login'
      
      if (!isLoginRequest && !isOnLoginPage) {
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

/**
 * Map API endpoint to success event name and emit event
 */
function emitSuccessEvent(url: string, data: any, requestId: string, userId?: string): void {
  const timestamp = new Date().toISOString()
  
  // Map endpoints to event names
  if (url.includes('/auth/login')) {
    eventBus.emit('auth.login.success', {
      payload: data,
      timestamp,
      requestId,
      userId,
    } as BaseEventData<{ user: any; token: string }>)
  } else if (url.includes('/auth/logout')) {
    eventBus.emit('auth.logout.success', {
      payload: undefined,
      timestamp,
      requestId,
      userId,
    } as BaseEventData<void>)
  } else if (url.includes('/auth/me')) {
    eventBus.emit('auth.me.loaded', {
      payload: { user: data },
      timestamp,
      requestId,
      userId,
    } as BaseEventData<{ user: any }>)
  } else if (url.includes('/dashboard/stats')) {
    eventBus.emit('dashboard.stats.loaded', {
      payload: { stats: data },
      timestamp,
      requestId,
      userId,
    } as BaseEventData<{ stats: any }>)
  } else if (url.includes('/users') && !url.match(/\/users\/[^\/]+$/)) {
    // GET /users (list) - not /users/:id
    eventBus.emit('users.list.loaded', {
      payload: { users: data.data, meta: data.meta },
      timestamp,
      requestId,
      userId,
    } as BaseEventData<{ users: any[]; meta: any }>)
  }
}

/**
 * Map API endpoint to error event name and emit event
 */
function emitErrorEvent(url: string, error: AxiosError, requestId: string, userId?: string): void {
  const timestamp = new Date().toISOString()
  const errorData: BaseErrorEventData<void> = {
    payload: undefined,
    timestamp,
    requestId,
    userId,
    error: {
      message: (error.response?.data as any)?.message || error.message,
      status: error.response?.status,
      code: (error.response?.data as any)?.code,
      details: error.response?.data,
    },
  }

  // Map endpoints to error event names
  if (url.includes('/auth/login')) {
    eventBus.emit('auth.login.error', errorData)
  } else if (url.includes('/auth/logout')) {
    eventBus.emit('auth.logout.error', errorData)
  } else if (url.includes('/auth/me')) {
    eventBus.emit('auth.me.error', errorData)
  } else if (url.includes('/dashboard/stats')) {
    eventBus.emit('dashboard.stats.error', errorData)
  } else if (url.includes('/users')) {
    eventBus.emit('users.list.error', errorData)
  }
}

export default http
