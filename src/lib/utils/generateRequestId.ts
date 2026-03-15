/**
 * Generates a unique request ID for tracking API requests
 * Uses native crypto.randomUUID() when available, falls back to timestamp-based ID
 * @returns Unique identifier string
 */
export function generateRequestId(): string {
  // Use crypto.randomUUID() if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  // Fallback: timestamp + random string
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
}
