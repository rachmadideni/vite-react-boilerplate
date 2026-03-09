# MSW (Mock Service Worker) Setup

This directory contains the Mock Service Worker configuration for API mocking during development.

## Structure

```
mocks/
├── handlers.ts              # Main handlers export (combines all handler groups)
├── browser.ts               # MSW worker setup for browser environment
├── README.md               # This file
├── utils/
│   └── auth.utils.ts       # Authentication utilities (withAuth HOC)
└── handlers/               # Handler groups organized by feature/domain
    ├── auth.handlers.ts    # Authentication endpoints
    ├── dashboard.handlers.ts # Dashboard endpoints (protected)
    └── users.handlers.ts   # User management endpoints (protected)
```

## Files

- **`handlers.ts`**: Main file that combines all handler groups
- **`browser.ts`**: Sets up the MSW worker for browser environment
- **`utils/auth.utils.ts`**: Contains `withAuth()` higher-order resolver for protected endpoints
- **`handlers/`**: Directory containing handler groups organized by feature/domain

## Available Mock Endpoints

### Authentication (`handlers/auth.handlers.ts`)
- `POST /api/auth/login` - Login endpoint
  - Success: `demo@example.com` / `password123`
  - Returns: `{ token, user }`
  
- `GET /api/auth/me` - Get current user (protected)
  - Requires: `Authorization: Bearer <token>` header
  
- `POST /api/auth/logout` - Logout endpoint (protected)

### Dashboard (`handlers/dashboard.handlers.ts`)
- `GET /api/dashboard/stats` - Get dashboard statistics (protected)

### Users (`handlers/users.handlers.ts`)
- `GET /api/users?page=1&limit=10` - Get paginated users list (protected)

## How It Works

1. MSW intercepts network requests at the service worker level
2. Requests are matched against handlers defined in `handlers/*` files
3. Mock responses are returned without hitting real servers
4. Works in development mode only (see `main.tsx`)

## Adding New Mock Endpoints

### Option 1: Add to existing handler group

Edit the appropriate handler file in `handlers/`:

```typescript
// handlers/auth.handlers.ts
export const authHandlers = [
  // ... existing handlers
  
  http.post(`${BASE_URL}/auth/register`, async ({ request }) => {
    return HttpResponse.json(
      { message: 'Registration successful' },
      { status: 201 }
    )
  }),
]
```

### Option 2: Create a new handler group

1. Create a new file in `handlers/` directory:

```typescript
// handlers/products.handlers.ts
import { http, HttpResponse } from 'msw'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const productsHandlers = [
  http.get(`${BASE_URL}/products`, () => {
    return HttpResponse.json(
      { data: [...] },
      { status: 200 }
    )
  }),
]
```

2. Import and add to `handlers.ts`:

```typescript
import { productsHandlers } from './handlers/products.handlers'

export const handlers = [
  ...authHandlers,
  ...dashboardHandlers,
  ...usersHandlers,
  ...productsHandlers, // Add new handler group
]
```

## Configuration

MSW is initialized in `src/main.tsx` and only runs in development mode:

```typescript
if (import.meta.env.MODE !== 'development') {
  return
}
```

The API base URL is configured in `.env`:
```
VITE_API_BASE_URL=/api
```

## Protected Endpoints

Protected endpoints use the `withAuth()` higher-order resolver from `utils/auth.utils.ts`. It checks for a valid `Authorization: Bearer <token>` header and returns 401 if missing or invalid.

Usage example:
```typescript
import { withAuth } from '../utils/auth.utils'

http.get(`${BASE_URL}/protected-resource`, withAuth(({ request }) => {
  // This code only runs if authenticated
  return HttpResponse.json({ data: 'secret data' })
}))
```

## Testing Credentials

Use these credentials in the login form:
- Email: `demo@example.com`
- Password: `password123`

## Learn More

- [MSW Documentation](https://mswjs.io/docs/)
- [MSW Quick Start](https://mswjs.io/docs/quick-start)
- [Structuring Handlers](https://mswjs.io/docs/best-practices/structuring-handlers)
