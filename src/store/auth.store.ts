import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        setUser: (user) => set({ user, isAuthenticated: true }, false, 'setUser'),
        setToken: (token) => set({ token }, false, 'setToken'),
        logout: () =>
          set({ user: null, token: null, isAuthenticated: false }, false, 'logout'),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ token: state.token, user: state.user }),
      }
    ),
    { name: 'AuthStore' }
  )
)
