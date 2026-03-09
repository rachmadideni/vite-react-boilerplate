import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@store/auth.store'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor — attach auth token
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle errors globally
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
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

export default http
