import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useAuthStore } from '@store/auth.store'
import { useAppStore } from '@store/app.store'
import { Button } from '@components/ui/button'
import { LayoutDashboard, Home, Settings, LogOut, Globe } from 'lucide-react'

export function MainLayout() {
  const { formatMessage } = useIntl()
  const { user, logout } = useAuthStore()
  const { locale, setLocale } = useAppStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-card px-4 py-6 md:flex">
        <div className="mb-8 px-2">
          <h1 className="text-xl font-bold text-primary">⚡ MyApp</h1>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="h-4 w-4" />
            {formatMessage({ id: 'nav.home' })}
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <LayoutDashboard className="h-4 w-4" />
            {formatMessage({ id: 'nav.dashboard' })}
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-4 w-4" />
            {formatMessage({ id: 'nav.settings' })}
          </Link>
        </nav>
        <div className="mt-auto space-y-2 border-t pt-4">
          <div className="px-3 py-2">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => setLocale(locale === 'en' ? 'id' : 'en')}
          >
            <Globe className="h-4 w-4" />
            {locale.toUpperCase()}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {formatMessage({ id: 'nav.logout' })}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
