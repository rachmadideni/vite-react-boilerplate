import type { EventMap, EventMiddleware, EventHandler } from '@/types/events'

/**
 * Type-safe event bus for application-wide event handling
 * Supports middleware pattern for extensibility
 */
class EventBus {
  private listeners = new Map<keyof EventMap, Set<EventHandler<any>>>()
  private middlewares: EventMiddleware[] = []

  /**
   * Register a middleware function
   * Middlewares are executed in registration order before event emission
   * @param middleware - Function that can transform, log, or prevent events
   */
  use(middleware: EventMiddleware): void {
    this.middlewares.push(middleware)
  }

  /**
   * Subscribe to an event
   * @param event - Event name from EventMap
   * @param handler - Callback function to execute when event is emitted
   */
  on<K extends keyof EventMap>(event: K, handler: EventHandler<K>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(handler)
  }

  /**
   * Unsubscribe from an event
   * @param event - Event name from EventMap
   * @param handler - Previously registered callback function
   */
  off<K extends keyof EventMap>(event: K, handler: EventHandler<K>): void {
    const handlers = this.listeners.get(event)
    if (handlers) {
      handlers.delete(handler)
      if (handlers.size === 0) {
        this.listeners.delete(event)
      }
    }
  }

  /**
   * Emit an event to all subscribers
   * Runs through middleware chain before notifying listeners
   * @param event - Event name from EventMap
   * @param data - Event data matching the event type
   */
  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
    // Execute middleware chain
    let shouldEmit = true
    let currentIndex = 0

    const next = () => {
      if (currentIndex < this.middlewares.length) {
        const middleware = this.middlewares[currentIndex]
        currentIndex++
        const result = middleware(event, data, next)
        if (result === false) {
          shouldEmit = false
        }
      }
    }

    // Start middleware chain
    next()

    // If any middleware returned false, stop emission
    if (!shouldEmit) {
      return
    }

    // Notify all listeners
    const handlers = this.listeners.get(event)
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(data)
        } catch (error) {
          console.error(`Error in event handler for "${String(event)}":`, error)
        }
      })
    }
  }

  /**
   * Remove all listeners for a specific event or all events
   * @param event - Optional event name. If omitted, clears all listeners
   */
  clear(event?: keyof EventMap): void {
    if (event) {
      this.listeners.delete(event)
    } else {
      this.listeners.clear()
    }
  }

  /**
   * Get the number of listeners for a specific event
   * @param event - Event name from EventMap
   * @returns Number of registered listeners
   */
  listenerCount(event: keyof EventMap): number {
    return this.listeners.get(event)?.size ?? 0
  }
}

/**
 * Singleton event bus instance
 * Import this to emit or listen to events throughout the application
 */
export const eventBus = new EventBus()
