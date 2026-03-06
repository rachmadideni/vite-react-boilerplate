import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { useAppStore } from '@store/app.store'
import { router } from '@router/index'
import { getMessages } from '@locales/index'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  const { locale } = useAppStore()
  const messages = getMessages(locale)

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={locale} messages={messages} defaultLocale="en">
        <RouterProvider router={router} />
      </IntlProvider>
      {import.meta.env.VITE_ENABLE_DEVTOOLS === 'true' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
