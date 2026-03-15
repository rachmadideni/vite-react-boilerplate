import { useMemo, useState } from 'react'
import { useSSE } from '@/hooks/useSSE'
import { useAuthStore } from '@/store/auth.store'

interface Notification {
  id: number
  type: 'info' | 'success' | 'warning' | 'connected'
  title: string
  message: string
  timestamp: string
}

interface Alert {
  id: number
  severity: string
  title: string
  message: string
  timestamp: string
}

interface Metric {
  name: string
  value: number
  unit: string
  timestamp: string
}

export function NotificationStream() {
  const token = useAuthStore((state) => state.token)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [metrics, setMetrics] = useState<Metric[]>([])
  
  // Construct URL with token as query parameter (EventSource doesn't support headers)
  const sseUrl = useMemo(() => {
    if (!token) return ''
    return `/api/notifications/stream?token=${encodeURIComponent(token)}`
  }, [token])
  
  const { data, error, isConnected } = useSSE<Notification>(sseUrl, {
    enabled: !!token,
    events: {
      alert: (alertData: Alert) => {        
        setAlerts([alertData])
      },
      metric: (metricData: Metric) => {
        if (metricData.name === 'cpu_usage') {
          setMetrics([metricData])
        }
      },
    },
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-800'
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800'
      case 'connected':
        return 'bg-blue-100 border-blue-500 text-blue-800'
      default:
        return 'bg-gray-100 border-gray-500 text-gray-800'
    }
  }

  if (!token) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-yellow-100 border border-yellow-500 text-yellow-700 p-4 rounded-lg">
          Please login to receive real-time notifications
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Real-Time Notifications</h2>
        
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-sm font-medium">
            {isConnected ? 'Connected to notification stream' : 'Disconnected'}
          </span>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg mb-4">
            <strong>Error:</strong> {error.message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Default Notifications */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Notifications</h3>
          {data && data.type !== 'connected' && (
            <div className={`border-l-4 p-4 rounded-lg shadow-md ${getTypeColor(data.type)}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-bold mb-1">{data.title}</h4>
                  <p className="text-sm mb-2">{data.message}</p>
                  <small className="text-xs opacity-75">
                    {new Date(data.timestamp).toLocaleString()}
                  </small>
                </div>
                <span className="text-xs font-semibold uppercase px-2 py-1 rounded">
                  {data.type}
                </span>
              </div>
            </div>
          )}
          {!data && isConnected && (
            <div className="text-center text-gray-500 py-4 text-sm">
              Waiting for notifications...
            </div>
          )}
        </div>

        {/* Alerts */}
        <div>
          <h3 className="text-lg font-semibold mb-3">System Alerts</h3>
          <div className="space-y-2">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div key={alert.id} className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-red-700 uppercase">{alert.severity}</span>
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                  </div>
                  <p className="text-xs text-gray-700">{alert.message}</p>
                  <small className="text-xs text-gray-500">
                    {new Date(alert.timestamp).toLocaleString()}
                  </small>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4 text-sm">
                No alerts yet
              </div>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-3">System Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {metrics.length > 0 ? (
              metrics.map((metric, idx) => (
                <div key={idx} className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">{metric.name}</div>
                  <div className="text-2xl font-bold text-blue-700">
                    {metric.value}{metric.unit}
                  </div>
                  <small className="text-xs text-gray-500">
                    {new Date(metric.timestamp).toLocaleTimeString()}
                  </small>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-4 text-sm">
                No metrics yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}