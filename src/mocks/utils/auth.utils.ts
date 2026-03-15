import { HttpResponse, HttpResponseResolver } from 'msw'

/**
 * Higher-order response resolver that checks for authentication
 * Wraps a handler and ensures the request has a valid Authorization header
 * For SSE requests, also checks the token query parameter since EventSource doesn't support custom headers
 * @param resolver The actual handler to execute if authenticated
 * @returns A new handler with authentication check
 */
export const withAuth = (resolver: HttpResponseResolver): HttpResponseResolver => {
  return (input) => {
    const authHeader = input.request.headers.get('Authorization')
    
    // For SSE/EventSource requests, check token in query params
    const url = new URL(input.request.url)
    const tokenParam = url.searchParams.get('token')
    
    // Check either Authorization header or token query param
    const hasValidAuth = 
      (authHeader && authHeader.startsWith('Bearer ')) || 
      (tokenParam && tokenParam.length > 0)
    
    if (!hasValidAuth) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // If authenticated, call the original resolver
    return resolver(input)
  }
}
