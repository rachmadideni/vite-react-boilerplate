import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

type Locale = 'en' | 'id'
type Theme = 'light' | 'dark' | 'system'

interface AppState {
  locale: Locale
  theme: Theme
  setLocale: (locale: Locale) => void
  setTheme: (theme: Theme) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        locale: 'en',
        theme: 'system',
        setLocale: (locale) => set({ locale }, false, 'setLocale'),
        setTheme: (theme) => set({ theme }, false, 'setTheme'),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({ locale: state.locale, theme: state.theme }),
      }
    ),
    { name: 'AppStore' }
  )
)
