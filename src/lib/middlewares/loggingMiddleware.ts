import type { EventMiddleware } from '@/types/events'

/**
 * Logging middleware for development
 * Logs all events to console with detailed information
 */
export const loggingMiddleware: EventMiddleware = (event, data, next) => {
  // Only log in development mode
  if (import.meta.env.MODE !== 'development') {
    next()
    return
  }

  // Log event with grouped console output
  console.groupCollapsed(`🔔 Event: ${String(event)}`)
  console.log('Timestamp:', data.timestamp)
  console.log('Request ID:', data.requestId)
  if (data.userId) {
    console.log('User ID:', data.userId)
  }
  console.log('Payload:', data.payload)
  if ('error' in data) {
    console.error('Error:', data.error)
  }
  console.groupEnd()

  next()
}
