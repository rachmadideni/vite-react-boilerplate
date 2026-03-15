import type { EventMiddleware } from '@/types/events'

/**
 * Analytics middleware for production
 * Tracks events to analytics service (placeholder implementation)
 */
export const analyticsMiddleware: EventMiddleware = (event, data, next) => {
  // Only track in production mode
  if (import.meta.env.MODE !== 'production') {
    next()
    return
  }

  // Track event to analytics service
  // Replace with your actual analytics implementation (Google Analytics, Mixpanel, etc.)
  try {
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track(String(event), {
        ...data.payload,
        timestamp: data.timestamp,
        requestId: data.requestId,
        userId: data.userId,
      })
    }
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }

  next()
}
