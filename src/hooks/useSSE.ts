import { useEffect, useState, useRef, useCallback } from 'react'

interface UseSSEOptions {
  enabled?: boolean
  events?: {
    [eventName: string]: (data: any) => void
  }
}

export function useSSE<T = any>(url: string, options: UseSSEOptions = {}) {
  const { enabled = true, events = {} } = options
  
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const eventSourceRef = useRef<EventSource | null>(null)
  const eventsRef = useRef(events)

  // Update events ref when events change
  useEffect(() => {
    eventsRef.current = events
  }, [events])

  useEffect(() => {
    if (!enabled || !url) return

    console.log('[SSE] Initializing connection to:', url)

    try {
      // Create EventSource - token will be in the URL
      const eventSource = new EventSource(url)
      eventSourceRef.current = eventSource

      eventSource.onopen = () => {
        console.log('[SSE] Connection opened')
        setIsConnected(true)
        setError(null)
      }

      // Default message handler
      eventSource.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data) as T
          console.log('[SSE] Received (default):', parsedData)
          setData(parsedData)
        } catch (err) {
          console.error('[SSE] Parse error:', err)
          const parseError = new Error('Failed to parse SSE data')
          setError(parseError)
        }
      }

      // Register custom event listeners
      Object.keys(eventsRef.current).forEach((eventName) => {
        const handler = (event: MessageEvent) => {
          try {
            const parsedData = JSON.parse(event.data)
            console.log(`[SSE] Received (${eventName}):`, parsedData)
            eventsRef.current[eventName]?.(parsedData)
          } catch (err) {
            console.error(`[SSE] Parse error for ${eventName}:`, err)
          }
        }
        eventSource.addEventListener(eventName, handler as EventListener)
      })

      eventSource.onerror = (err) => {
        console.error('[SSE] Error:', err)
        const connectionError = new Error('SSE connection error')
        setError(connectionError)
        setIsConnected(false)
      }
    } catch (err) {
      console.error('[SSE] Failed to create EventSource:', err)
      setError(err as Error)
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      console.log('[SSE] Closing connection')
      eventSourceRef.current?.close()
      eventSourceRef.current = null
      setIsConnected(false)
    }
  }, [url, enabled])

  const close = useCallback(() => {
    eventSourceRef.current?.close()
    eventSourceRef.current = null
    setIsConnected(false)
  }, [])

  return { 
    data, 
    error, 
    isConnected,
    close
  }
}