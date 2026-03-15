import type { EventMiddleware } from '@/types/events'

/**
 * Validation middleware
 * Validates event payload structure and logs warnings for malformed events
 * Does not prevent emission, just provides developer feedback
 */
export const validationMiddleware: EventMiddleware = (event, data, next) => {
  // Only validate in development mode
  if (import.meta.env.MODE !== 'development') {
    next()
    return
  }

  // Basic validation checks
  const warnings: string[] = []

  // Check required fields
  if (!data.timestamp) {
    warnings.push('Missing timestamp')
  }
  if (!data.requestId) {
    warnings.push('Missing requestId')
  }

  // Validate timestamp format
  if (data.timestamp && isNaN(Date.parse(data.timestamp))) {
    warnings.push('Invalid timestamp format')
  }

  // Check for error events having error field
  if (String(event).includes('.error') && !('error' in data)) {
    warnings.push('Error event missing error field')
  }

  // Log warnings if any
  if (warnings.length > 0) {
    console.warn(`⚠️ Event validation warnings for "${String(event)}":`, warnings)
    console.warn('Event data:', data)
  }

  next()
}
