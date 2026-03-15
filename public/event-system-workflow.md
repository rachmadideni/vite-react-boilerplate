# Event System Workflow Diagram

## Complete Flow Architecture

```mermaid
graph TD
    A[User Action<br/>e.g., Login Form Submit] --> B[HTTP Request via axios]
    
    B --> C[Request Interceptor]
    C --> C1[Generate Request ID]
    C --> C2[Add Timestamp]
    C --> C3[Attach Auth Token]
    C1 --> D[config.metadata]
    C2 --> D
    C3 --> D
    
    D --> E{Environment?}
    E -->|Development| F[MSW Intercepts]
    E -->|Production| G[Real API Server]
    
    F --> H[Mock Response]
    G --> H[API Response]
    
    H --> I[Response Interceptor]
    I --> I1[Extract Metadata<br/>requestId, timestamp]
    I --> I2[Get User ID from Store]
    I --> I3[Map Endpoint to Event]
    
    I1 --> J[Event Data Object]
    I2 --> J
    I3 --> J
    
    J --> K[eventBus.emit<br/>domain.action.status]
    
    K --> L[Middleware Chain]
    L --> L1[1. Test Mode Check<br/>Prevent in tests?]
    L1 -->|Continue| L2[2. Validation<br/>Check payload structure]
    L2 --> L3[3. Logging<br/>Console log in dev]
    L3 --> L4[4. Analytics<br/>Track in production]
    L4 --> M{Emit Allowed?}
    
    M -->|Yes| N[Notify All Listeners]
    M -->|No| Z[Stop Emission]
    
    N --> O1[Store Event Listeners<br/>src/store/event-listeners.ts]
    N --> O2[Component Listeners<br/>via useEventListener hook]
    
    O1 --> P1[Update Zustand Stores<br/>auth.store, etc.]
    O2 --> P2[Component State/Actions]
    
    P1 --> Q[UI Re-renders]
    P2 --> Q
    
    style A fill:#e1f5ff
    style K fill:#fff4e1
    style L fill:#ffe1f5
    style N fill:#e1ffe1
    style Q fill:#e1f5ff
```

## Detailed Component Breakdown

### 1. Request Phase
```mermaid
sequenceDiagram
    participant User
    participant Component
    participant Axios
    participant Interceptor
    
    User->>Component: Submits Form
    Component->>Axios: http.post('/auth/login', data)
    Axios->>Interceptor: Request Interceptor
    Interceptor->>Interceptor: generateRequestId()
    Interceptor->>Interceptor: Add timestamp
    Interceptor->>Interceptor: Attach auth token
    Note over Interceptor: config.metadata = {<br/>requestId, timestamp<br/>}
    Interceptor->>Axios: Modified config
```

### 2. Response & Event Emission Phase
```mermaid
sequenceDiagram
    participant API
    participant Interceptor
    participant EventBus
    participant Middleware
    participant Listeners
    
    API->>Interceptor: Response/Error
    Interceptor->>Interceptor: Extract metadata
    Interceptor->>Interceptor: Get userId from store
    Interceptor->>Interceptor: Map endpoint to event name
    Note over Interceptor: POST /auth/login<br/>→ auth.login.success
    Interceptor->>EventBus: emit(event, data)
    EventBus->>Middleware: Run middleware chain
    Middleware->>Middleware: testModeMiddleware
    Middleware->>Middleware: validationMiddleware
    Middleware->>Middleware: loggingMiddleware
    Middleware->>Middleware: analyticsMiddleware
    Middleware->>EventBus: Allow emission?
    EventBus->>Listeners: Notify all subscribers
```

### 3. Store Update Phase
```mermaid
sequenceDiagram
    participant EventBus
    participant EventListeners
    participant AuthStore
    participant Component
    participant UI
    
    EventBus->>EventListeners: auth.login.success event
    Note over EventListeners: initializeEventListeners()<br/>registered handlers
    EventListeners->>AuthStore: setToken(token)
    EventListeners->>AuthStore: setUser(user)
    AuthStore->>Component: State changed
    Component->>UI: Re-render with new state
    
    par Component Direct Subscription
        EventBus->>Component: useEventListener hook
        Component->>Component: Custom action
        Component->>UI: Update
    end
```

## Event Mapping Reference

### Authentication Events
| Endpoint | Method | Success Event | Error Event |
|----------|--------|---------------|-------------|
| `/auth/login` | POST | `auth.login.success` | `auth.login.error` |
| `/auth/logout` | POST | `auth.logout.success` | `auth.logout.error` |
| `/auth/me` | GET | `auth.me.loaded` | `auth.me.error` |

### Dashboard Events
| Endpoint | Method | Success Event | Error Event |
|----------|--------|---------------|-------------|
| `/dashboard/stats` | GET | `dashboard.stats.loaded` | `dashboard.stats.error` |

### User Management Events
| Endpoint | Method | Success Event | Error Event |
|----------|--------|---------------|-------------|
| `/users` | GET | `users.list.loaded` | `users.list.error` |
| `/users` | POST | `users.create.success` | `users.create.error` |
| `/users/:id` | PUT | `users.update.success` | `users.update.error` |
| `/users/:id` | DELETE | `users.delete.success` | `users.delete.error` |

## Event Data Structure

```typescript
interface BaseEventData<T> {
  payload: T              // The actual response data
  timestamp: string       // ISO 8601 timestamp
  requestId: string       // Unique request identifier (UUID)
  userId?: string         // Current user ID (if authenticated)
}

interface BaseErrorEventData<T> extends BaseEventData<T> {
  error: {
    message: string       // Error message
    status?: number       // HTTP status code
    code?: string         // Error code
    details?: any         // Additional error details
  }
}
```

## Middleware Execution Order

1. **testModeMiddleware** - Checks if running in test mode, can prevent emission
2. **validationMiddleware** - Validates payload structure, logs warnings
3. **loggingMiddleware** - Logs to console in development mode
4. **analyticsMiddleware** - Tracks events in production mode

Each middleware can:
- ✅ Transform event data
- ✅ Add side effects (logging, tracking)
- ✅ Prevent emission (return `false`)
- ✅ Continue to next middleware (call `next()`)

## Usage Examples

### In Components (Subscribe to Events)
```tsx
import { useEventListener } from '@/hooks/useEventListener'

function MyComponent() {
  useEventListener('auth.login.success', (data) => {
    console.log('User logged in:', data.payload.user)
    // Custom component logic
  })
  
  return <div>...</div>
}
```

### In Stores (Centralized Updates)
```typescript
// src/store/event-listeners.ts
export function initializeEventListeners() {
  eventBus.on('auth.login.success', (data) => {
    const { setUser, setToken } = useAuthStore.getState()
    setToken(data.payload.token)
    setUser(data.payload.user)
  })
  
  // More event handlers...
}
```

### Adding Custom Middleware
```typescript
import { eventBus } from '@/lib/eventBus'
import type { EventMiddleware } from '@/types/events'

const customMiddleware: EventMiddleware = (event, data, next) => {
  // Your custom logic
  console.log('Custom middleware:', event)
  
  // Continue to next middleware
  next()
  
  // Or prevent emission
  // return false
}

eventBus.use(customMiddleware)
```

## Key Benefits

1. **🎯 Centralized Event Handling** - All API events flow through one system
2. **🔍 Request Tracking** - Every request has a unique ID for debugging
3. **🧩 Extensible** - Add middleware for logging, analytics, validation
4. **🔄 Decoupled** - Components don't need to know about store updates
5. **🏭 Production Ready** - Works with both MSW mocks and real APIs
6. **📊 Analytics Ready** - Built-in analytics middleware
7. **🧪 Test Friendly** - Can disable events in test mode
8. **⚡ Type Safe** - Full TypeScript support with strict event types

## Files Reference

- **Event Types**: `src/types/events.ts`
- **Event Bus**: `src/lib/eventBus.ts`
- **HTTP Integration**: `src/lib/http.ts`
- **React Hook**: `src/hooks/useEventListener.ts`
- **Store Listeners**: `src/store/event-listeners.ts`
- **Middlewares**: `src/lib/middlewares/`
- **Initialization**: `src/main.tsx`
