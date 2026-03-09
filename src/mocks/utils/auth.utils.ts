import { HttpResponse, HttpResponseResolver } from 'msw'

/**
 * Higher-order response resolver that checks for authentication
 * Wraps a handler and ensures the request has a valid Authorization header
 * @param resolver The actual handler to execute if authenticated
 * @returns A new handler with authentication check
 */
export const withAuth = (resolver: HttpResponseResolver): HttpResponseResolver => {
  return (input) => {
    const authHeader = input.request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // If authenticated, call the original resolver
    return resolver(input)
  }
}
