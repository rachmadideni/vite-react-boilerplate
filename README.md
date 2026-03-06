# ⚡ Vite React Boilerplate

A production-ready, highly scalable React boilerplate with the best developer experience and a focus on performance and best practices.

Start your next React project in seconds with a modern stack, powerful CLI generators, and best-in-class tooling.

---

## ✨ Features

- **🚀 Quick scaffolding** - Create components, pages, hooks, stores, and features right from the CLI
- **⚡ Lightning fast** - Powered by Vite for instant HMR and optimized builds
- **📦 Modern stack** - React 18, TypeScript, Tailwind CSS v4, React Query v5
- **🎯 Type-safe** - Full TypeScript support with strict mode
- **🧩 Component library** - Pre-configured shadcn/ui components
- **🌍 Internationalization** - Built-in i18n with react-intl (EN + ID)
- **🔐 Authentication** - Complete auth flow with protected routes
- **🎨 Styling** - Tailwind CSS v4 with custom design system
- **🧪 Testing** - Vitest + Testing Library setup
- **📱 Responsive** - Mobile-first design approach
- **🔍 Code quality** - ESLint + Prettier configured

---

## 🚀 Quick Start

1. Make sure you have **Node.js v18+** and **npm v8+** installed
2. Clone this repo:
   ```bash
   git clone --depth=1 https://github.com/YOUR_USERNAME/vite-react-boilerplate.git <YOUR_PROJECT_NAME>
   ```
3. Move to the directory:
   ```bash
   cd <YOUR_PROJECT_NAME>
   ```
4. Run setup to install dependencies and initialize your project:
   ```bash
   npm run setup
   ```
   At this point you can run `npm run dev` to see the example app at `http://localhost:3000`

5. Run clean to delete the example app:
   ```bash
   npm run clean
   ```

**Now you're ready to rumble!** 🎉

> **Note:** Both `setup` and `clean` commands are self-destructive. Once you run them, they delete themselves. This is for your safety, so you can't accidentally reset your project.

> **Tip:** Check out [docs/SETUP.md](docs/SETUP.md) for a detailed setup guide and best practices.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **Vite** | Ultra-fast dev server & bundler |
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **Zustand** | Lightweight global state |
| **React Query v5** | Server state & data fetching |
| **Axios** | HTTP client with interceptors |
| **React Router v6** | Client-side routing |
| **react-intl** | i18n (EN + ID included) |
| **Tailwind CSS v4** | Utility-first styling |
| **shadcn/ui** | Accessible UI components |
| **ESLint + Prettier** | Code quality & formatting |
| **Vitest** | Unit & component testing |
| **Plop** | Code generator CLI |

---

## 📁 Project Structure

```
src/
├── app/             # App entry, global CSS, providers
├── components/
│   ├── ui/          # shadcn/ui components (Button, Input, Card...)
│   └── common/      # Shared layout components
├── features/        # Feature modules (collocate API, store, components)
├── hooks/           # Reusable custom hooks
├── lib/             # http.ts (Axios instance)
├── locales/
│   ├── en/          # English messages
│   └── id/          # Indonesian messages
├── pages/           # Route-level page components
├── router/          # React Router config
├── store/           # Zustand stores (app.store, auth.store)
├── types/           # Global TypeScript types
└── utils/           # Pure utility functions

internals/           # Boilerplate infrastructure (removed after setup)
├── generators/      # Plop templates for code generation
└── scripts/         # Setup and clean scripts
```

> **Note:** The `internals/` folder is removed after running `npm run clean` to keep your project clean.

---

## 🎯 Code Generation

Generate boilerplate code instantly with built-in CLI:

```bash
# Interactive generator
npm run generate

# Or use specific generators
npm run generate:component  # Create a component
npm run generate:page       # Create a page
npm run generate:hook       # Create a custom hook
npm run generate:store      # Create a Zustand store
npm run generate:feature    # Create a complete feature module
```

> **Note:** Code generators are available until you run `npm run clean`. After that, the `internals/` folder (containing all generator templates) and `plopfile.js` are removed to keep your project clean.

### Example: Create a new feature

```bash
npm run generate:feature
# Enter name: UserProfile
# Creates:
#   - src/features/user-profile/
#   - components/UserProfile.tsx
#   - hooks/useUserProfile.ts
#   - types.ts
#   - index.ts
```

See [docs/commands.md](docs/commands.md) for detailed documentation.

---

## 📜 Available Scripts

### Development

| Script | Description |
|--------|-------------|
| `npm run setup` | Initialize new project (self-destructive) |
| `npm run clean` | Remove example code (self-destructive) |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

### Code Quality

| Script | Description |
|--------|-------------|
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run type-check` | TypeScript type check |

### Testing

| Script | Description |
|--------|-------------|
| `npm test` | Run tests in watch mode |
| `npm run test:ui` | Open Vitest UI |
| `npm run test:coverage` | Generate coverage report |

### Generators

| Script | Description |
|--------|-------------|
| `npm run generate` | Interactive generator menu |
| `npm run generate:component` | Generate a component |
| `npm run generate:page` | Generate a page |
| `npm run generate:hook` | Generate a custom hook |
| `npm run generate:store` | Generate a Zustand store |
| `npm run generate:feature` | Generate a feature module |

---

## 🌍 Internationalization

Translations live in `src/locales/`. Add new languages:

1. Create `src/locales/<lang>/messages.ts`
2. Export from `src/locales/index.ts`
3. Add the locale to `useAppStore` type

Switch language at runtime via the UI.

---

## 🧩 Adding a New Feature

Create a self-contained feature module:

```
src/features/products/
├── api/
│   └── useProducts.ts     # React Query hooks
├── components/
│   └── ProductCard.tsx    # Feature-specific components
├── types.ts               # Feature types
└── index.ts               # Barrel export
```

---

## 🔒 Auth Flow

- `useAuthStore` (Zustand + persist) stores `user` and `token`
- `ProtectedRoute` redirects to `/login` if unauthenticated
- `AuthLayout` redirects to `/` if already authenticated
- Axios interceptor auto-attaches `Authorization: Bearer <token>`
- 401 responses auto-logout and redirect to `/login`

---

## 🎨 Adding shadcn/ui Components

```bash
npx shadcn-ui@latest add <component>
```

Components are placed in `src/components/ui/`.

---

## 🧪 Testing

Uses **Vitest** + **Testing Library**. Tests live next to source files as `*.test.ts(x)`.

```bash
npm test               # watch mode
npm run test:coverage  # with coverage
```
