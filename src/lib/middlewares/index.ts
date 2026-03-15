import { eventBus } from '../eventBus'
import { loggingMiddleware } from './loggingMiddleware'
import { analyticsMiddleware } from './analyticsMiddleware'
import { testModeMiddleware } from './testModeMiddleware'
import { validationMiddleware } from './validationMiddleware'

// Export all middlewares
export { loggingMiddleware } from './loggingMiddleware'
export { analyticsMiddleware } from './analyticsMiddleware'
export { testModeMiddleware, setTestMode } from './testModeMiddleware'
export { validationMiddleware } from './validationMiddleware'

/**
 * Register all default middlewares with the event bus
 * Call this during app initialization to enable all built-in middlewares
 * 
 * Middleware execution order:
 * 1. Test mode check (can prevent emission)
 * 2. Validation (warnings only)
 * 3. Logging (development only)
 * 4. Analytics (production only)
 */
export function registerDefaultMiddlewares(): void {
  eventBus.use(testModeMiddleware)
  eventBus.use(validationMiddleware)
  eventBus.use(loggingMiddleware)
  eventBus.use(analyticsMiddleware)
}
