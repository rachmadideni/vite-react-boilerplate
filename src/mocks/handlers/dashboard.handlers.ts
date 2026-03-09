import { http, HttpResponse } from 'msw'
import { withAuth } from '../utils/auth.utils'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com'

export const dashboardHandlers = [
  // Get dashboard stats (protected)
  http.get(`${BASE_URL}/dashboard/stats`, withAuth(() => {
    return HttpResponse.json(
      {
        totalUsers: 1234,
        activeUsers: 567,
        revenue: 89012,
        orders: 345,
      },
      { status: 200 }
    )
  })),
]
