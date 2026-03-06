import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '@store/auth.store'

export function AuthLayout() {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <Outlet />
    </div>
  )
}
