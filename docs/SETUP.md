# Boilerplate Setup Guide

This guide explains how to use this boilerplate as a starting point for your projects.

## For New Projects

### Step 1: Clone the Repository

```bash
git clone --depth=1 https://github.com/YOUR_USERNAME/vite-react-boilerplate.git my-project
cd my-project
```

### Step 2: Run Setup

```bash
npm run setup
```

This interactive setup will:
1. Ask for your project name (updates package.json)
2. Optionally remove git history and create a fresh repo
3. Install all dependencies
4. Delete itself (one-time use only)

### Step 3: Start Development

```bash
npm run dev
```

Your app will be running at `http://localhost:3000`

### Step 4: Clean Example Code (Optional)

If you want to start with a minimal app without examples:

```bash
npm run clean
```

This will:
- Remove example pages (Dashboard, Login, Home)
- Remove example auth components
- Create a minimal starter page
- Update routes to basics only
- Delete itself (one-time use only)

---

## What's Included

### Example Features (Before `npm run clean`)

- ✅ **Login Page** - Mock authentication flow
- ✅ **Dashboard** - Protected route example
- ✅ **Home Page** - Public page with navigation
- ✅ **Protected Routes** - Route guards with auth check
- ✅ **Auth Store** - Zustand store for auth state
- ✅ **Layouts** - MainLayout and AuthLayout components

### Boilerplate Infrastructure (Removed After Setup)

- 🔧 **internals/** - Boilerplate internals (removed after `npm run clean`)
  - **generators/** - Plop templates for code generation
  - **scripts/** - Setup and clean scripts
- 🔧 **plopfile.js** - Generator configuration (removed after `npm run clean`)

### Core Features (Always Available)

- ✅ **Vite** - Lightning fast dev server
- ✅ **React 18** - Latest React features
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS v4** - Utility-first styling
- ✅ **React Query** - Server state management
- ✅ **React Router** - Client-side routing
- ✅ **Zustand** - Global state management
- ✅ **React Intl** - Internationalization (EN, ID)
- ✅ **Axios** - HTTP client with interceptors
- ✅ **Vitest** - Unit testing
- ✅ **ESLint + Prettier** - Code quality

---

## Code Generators

**Available until you run `npm run clean`:**

After setup, use these commands to generate code:

```bash
# Interactive menu
npm run generate

# Specific generators
npm run generate:component  # UI or common component
npm run generate:page       # New page
npm run generate:hook       # Custom hook
npm run generate:store      # Zustand store
npm run generate:feature    # Complete feature module
```

> **Note:** These generators are removed when you run `npm run clean` to keep your final project clean. The `internals/` folder and `plopfile.js` are deleted along with the example code.

### Generator Examples

#### Generate a Component
```bash
npm run generate:component
# Name: ProfileCard
# Type: common
# Creates: src/components/common/ProfileCard.tsx
```

#### Generate a Page
```bash
npm run generate:page
# Name: Settings
# Creates: src/pages/Settings.tsx
```

#### Generate a Feature
```bash
npm run generate:feature
# Name: Products
# Creates:
#   src/features/products/
#   ├── index.ts
#   ├── types.ts
#   ├── components/Products.tsx
#   └── hooks/useProducts.ts
```

---

## Project Structure After Clean

```
src/
├── app/
│   ├── App.tsx                    # Root component
│   └── globals.css                # Global styles & Tailwind
├── components/
│   ├── ui/                        # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   └── common/
│       ├── LoadingSpinner.tsx
│       └── MainLayout.tsx
├── features/                      # Your features go here
│   └── README.ts
├── hooks/
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
├── lib/
│   └── http.ts                    # Axios instance
├── locales/
│   ├── en/messages.ts
│   ├── id/messages.ts
│   └── index.ts
├── pages/
│   ├── Home.tsx                   # Clean starter page
│   └── NotFound.tsx
├── router/
│   └── index.tsx                  # Route configuration
├── store/
│   └── app.store.ts              # App-level state
├── types/
│   └── index.ts                   # Global types
└── utils/
    └── index.ts                   # Utility functions
```

**What's removed:**
- ❌ `internals/` folder (generators and scripts)
- ❌ `plopfile.js`
- ❌ Generator commands from package.json

---

## Environment Variables

Copy `.env.example` to `.env` and customize:

```bash
cp .env.example .env
```

All environment variables must be prefixed with `VITE_`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_DEVTOOLS=true
VITE_APP_ENV=development
```

---

## Recommended Workflow

1. **Clone and setup**
   ```bash
   git clone --depth=1 [repo] my-app
   cd my-app
   npm run setup
   ```

2. **Decide on starting point**
   - Keep examples: Skip to step 3
   - Clean slate: Run `npm run clean`

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Start coding**
   ```bash
   npm run dev
   ```

5. **Generate your features**
   ```bash
   npm run generate:feature
   # Name: Authentication
   # Name: Products
   # etc.
   ```

6. **Run tests**
   ```bash
   npm test
   ```

7. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

---

## Tips

### Using the Example Code as Reference

Before running `npm run clean`, you might want to:
1. Read through the example pages (`Dashboard.tsx`, `Login.tsx`)
2. Study the auth implementation (`auth.store.ts`, `ProtectedRoute.tsx`)
3. Copy any patterns you want to reuse
4. Copy the `internals/` folder if you want to keep the generators

### Creating Your Own Generators

If you want to customize generators before running clean:
1. Edit `plopfile.js` to modify generator logic
2. Edit templates in `internals/generators/` to change output
3. Copy the entire `internals/` folder to preserve it after clean

> **Note:** The `internals/` folder and all generators are removed when you run `npm run clean` to keep your project clean and production-ready.

### Adding More UI Components

This boilerplate uses shadcn/ui. To add more components:
```bash
npx shadcn@latest add [component-name]
```

### Internationalization

Add new languages by:
1. Creating `src/locales/[lang]/messages.ts`
2. Exporting from `src/locales/index.ts`
3. Using the language selector in your UI

---

## Common Issues

### Port Already in Use

Change the port in `vite.config.ts`:
```typescript
server: {
  port: 3001, // Change this
}
```

### TypeScript Errors After Generation

Run type check:
```bash
npm run type-check
```

### Tailwind Classes Not Working

Make sure:
1. `@tailwindcss/vite` is installed
2. Plugin is added to `vite.config.ts`
3. Dev server is restarted

---

## Next Steps

- Read [docs/commands.md](./commands.md) for all available commands
- Check out the [Vite docs](https://vitejs.dev)
- Explore [React Query](https://tanstack.com/query)
- Learn about [Zustand](https://github.com/pmndrs/zustand)
- Browse [Tailwind CSS](https://tailwindcss.com)

---

**Happy coding! 🚀**
