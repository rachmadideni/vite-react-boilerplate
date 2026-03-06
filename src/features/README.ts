/**
 * Auth feature barrel export.
 *
 * Features are self-contained modules with their own:
 *   - api/     → React Query hooks + Axios calls
 *   - store/   → Zustand slice (if needed)
 *   - components/ → Feature-specific components
 *   - types.ts → Feature-specific types
 *
 * Add new feature folders under src/features/<feature-name>/
 */

export { useAuthStore } from '@store/auth.store'
