import { http, HttpResponse } from 'msw'
import { withAuth } from '../utils/auth.utils'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const notificationsHandlers = [
  // SSE endpoint for real-time notifications with custom events
  http.get(`${BASE_URL}/notifications/stream`, withAuth(() => {
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder()
        
        // Send initial connection message
        controller.enqueue(
          encoder.encode('data: {"type":"connected","message":"Stream established"}\n\n')
        )
        
        // Simulate periodic notifications with different event types
        let count = 0
        const interval = setInterval(() => {
          count++
          
          // Send different event types
          if (count % 4 === 0) {
            // Custom event: alert
            const alert = {
              id: Date.now(),
              severity: 'high',
              title: 'System Alert',
              message: 'High CPU usage detected',
              timestamp: new Date().toISOString(),
            }
            controller.enqueue(
              encoder.encode(`event: alert\ndata: ${JSON.stringify(alert)}\n\n`)
            )
          } else if (count % 3 === 0) {
            // Custom event: metric
            const metric = {
              name: 'cpu_usage',
              value: Math.floor(Math.random() * 100),
              unit: '%',
              timestamp: new Date().toISOString(),
            }
            controller.enqueue(
              encoder.encode(`event: metric\ndata: ${JSON.stringify(metric)}\n\n`)
            )
          } else {
            // Default message event
            const notification = {
              id: Date.now(),
              type: count % 2 === 0 ? 'success' : 'info',
              title: `Notification #${count}`,
              message: `This is notification number ${count}`,
              timestamp: new Date().toISOString(),
            }
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(notification)}\n\n`)
            )
          }
        }, 5000) // Send every 5 seconds
        
        // Cleanup on close
        return () => {
          clearInterval(interval)
          controller.close()
        }
      },
    })
    
    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  })),
]
