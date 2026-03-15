import { useEffect } from 'react'
import { eventBus } from '@/lib/eventBus'
import type { EventMap, EventHandler } from '@/types/events'

/**
 * React hook for subscribing to event bus events
 * Automatically handles cleanup on component unmount
 * 
 * @example
 * ```tsx
 * useEventListener('auth.login.success', (data) => {
 *   console.log('User logged in:', data.payload.user)
 * })
 * ```
 * 
 * @param event - Event name from EventMap
 * @param handler - Callback function to execute when event is emitted
 * @param deps - Optional dependency array for re-subscribing when values change
 */
export function useEventListener<K extends keyof EventMap>(
  event: K,
  handler: EventHandler<K>,
  deps: any[] = []
): void {
  useEffect(() => {
    // Subscribe to event
    eventBus.on(event, handler)

    // Cleanup: unsubscribe on unmount or when deps change
    return () => {
      eventBus.off(event, handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, ...deps])
}
