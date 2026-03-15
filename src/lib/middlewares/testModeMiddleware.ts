import type { EventMiddleware } from '@/types/events'

// Global flag to control test mode
let isTestMode = false

/**
 * Set test mode on/off
 * When enabled, events will not be emitted
 */
export function setTestMode(enabled: boolean): void {
  isTestMode = enabled
}

/**
 * Test mode middleware
 * Prevents event emission during tests
 */
export const testModeMiddleware: EventMiddleware = (event, data, next) => {
  // Check for test environment
  const isTest = import.meta.env.MODE === 'test' || isTestMode

  if (isTest) {
    // Prevent emission in test mode
    return false
  }

  next()
}
