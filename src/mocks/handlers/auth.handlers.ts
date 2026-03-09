import { http, HttpResponse } from 'msw'
import { withAuth } from '../utils/auth.utils'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com'

export const authHandlers = [
  // Login
  http.post(`${BASE_URL}/auth/login`, async ({ request }) => {
    const body = await request.json() as { email: string; password: string }
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Simulate validation
    if (!body.email || !body.password) {
      return HttpResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Mock successful login
    if (body.email === 'demo@example.com' && body.password === 'password123') {
      return HttpResponse.json(
        {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: '1',
            name: 'John Doe',
            email: body.email,
          },
        },
        { status: 200 }
      )
    }

    // Invalid credentials
    return HttpResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    )
  }),

  // Get current user (protected)
  http.get(`${BASE_URL}/auth/me`, withAuth(() => {
    return HttpResponse.json(
      {
        id: '1',
        name: 'John Doe',
        email: 'demo@example.com',
      },
      { status: 200 }
    )
  })),

  // Logout (protected)
  http.post(`${BASE_URL}/auth/logout`, withAuth(() => {
    return HttpResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )
  })),
]
