import { http, HttpResponse } from 'msw'
import { withAuth } from '../utils/auth.utils'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const usersHandlers = [
  // Get users list (protected)
  http.get(`${BASE_URL}/users`, withAuth(({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page') || '1'
    const limit = url.searchParams.get('limit') || '10'

    return HttpResponse.json(
      {
        data: Array.from({ length: Number(limit) }, (_, i) => ({
          id: String(i + 1 + (Number(page) - 1) * Number(limit)),
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          role: i % 2 === 0 ? 'admin' : 'user',
        })),
        meta: {
          page: Number(page),
          limit: Number(limit),
          total: 100,
        },
      },
      { status: 200 }
    )
  })),
]
