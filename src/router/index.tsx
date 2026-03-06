import { createBrowserRouter, Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { MainLayout } from '@components/common/MainLayout'
import { AuthLayout } from '@components/common/AuthLayout'
import { ProtectedRoute } from '@components/common/ProtectedRoute'
import { LoadingSpinner } from '@components/common/LoadingSpinner'

// Lazy-loaded pages
const HomePage = lazy(() => import('@pages/Home'))
const DashboardPage = lazy(() => import('@pages/Dashboard'))
const LoginPage = lazy(() => import('@pages/Login'))
const NotFoundPage = lazy(() => import('@pages/NotFound'))

function PageWrapper() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    element: <PageWrapper />,
    children: [
      // Public routes
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
        ],
      },
      // Protected routes
      {
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/dashboard', element: <DashboardPage /> },
        ],
      },
      // 404
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
