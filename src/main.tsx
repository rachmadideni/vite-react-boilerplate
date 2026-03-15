import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@app/App'
import '@app/globals.css'
import { initializeEventListeners } from '@store/event-listeners'
import { registerDefaultMiddlewares } from '@/lib/middlewares'

// Register event middlewares
registerDefaultMiddlewares()

// Initialize event listeners for store updates
initializeEventListeners()

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  })
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
