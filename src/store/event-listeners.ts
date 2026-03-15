import { eventBus } from '@/lib/eventBus'
import { useAuthStore } from './auth.store'

/**
 * Initialize event listeners that sync events with store updates
 * This creates the bridge between the event system and Zustand stores
 * 
 * Call this once during app initialization (in main.tsx)
 * 
 * @returns Cleanup function to remove all event listeners
 */
export function initializeEventListeners(): () => void {
  // Auth: Login success
  const onLoginSuccess = (data: any) => {
    const { setUser, setToken } = useAuthStore.getState()
    setToken(data.payload.token)
    setUser(data.payload.user)
  }

  // Auth: Logout success
  const onLogoutSuccess = () => {
    const { logout } = useAuthStore.getState()
    logout()
  }

  // Auth: User data loaded
  const onUserLoaded = (data: any) => {
    const { setUser } = useAuthStore.getState()
    setUser(data.payload.user)
  }

  // Subscribe to all events
  eventBus.on('auth.login.success', onLoginSuccess)
  eventBus.on('auth.logout.success', onLogoutSuccess)
  eventBus.on('auth.me.loaded', onUserLoaded)

  // Return cleanup function
  return () => {
    eventBus.off('auth.login.success', onLoginSuccess)
    eventBus.off('auth.logout.success', onLogoutSuccess)
    eventBus.off('auth.me.loaded', onUserLoaded)
  }
}
