import { authHandlers } from './handlers/auth.handlers'
import { dashboardHandlers } from './handlers/dashboard.handlers'
import { usersHandlers } from './handlers/users.handlers'

/**
 * Combine all request handlers by feature/domain
 * Following MSW best practices for structuring handlers
 * @see https://mswjs.io/docs/best-practices/structuring-handlers
 */
export const handlers = [
  ...authHandlers,
  ...dashboardHandlers,
  ...usersHandlers,
]
