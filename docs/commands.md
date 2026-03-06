# Command Line Commands

## Initialization

### `npm run setup`

**⚠️ IMPORTANT: This command is self-destructive!**

Initializes your new project:
- Prompts for your project name
- Updates `package.json` with the new name
- Optionally removes the boilerplate's git history
- Initializes a fresh git repository
- Creates an initial commit
- Installs all dependencies
- **Deletes itself** when complete

```bash
npm run setup
```

You will be prompted:
1. "What is your project name?" - Enter your project name (optional)
2. "Do you want to remove the existing git history?" - Type `y` to start fresh

> **Note:** Once you run this command, it's gone forever. You cannot run it again. This is for your safety.

---

## Cleaning

### `npm run clean`

**⚠️ IMPORTANT: This command is self-destructive!**

Deletes the example app and replaces it with minimal boilerplate:
- Removes example pages (Dashboard, Login, Home)
- Removes example stores (auth.store)
- Removes example components (AuthLayout, ProtectedRoute)
- Creates a clean starter Home page
- Updates router with minimal routes
- **Deletes itself** when complete

```bash
npm run clean
```

> **Note:** Once you run this command, it's gone forever. You cannot run it again. This prevents you from accidentally deleting your work.

---

## What Gets Removed?

After running `npm run setup` and `npm run clean`, the following boilerplate files are removed:

- **internals/** folder
  - `internals/generators/` - All Plop templates
  - `internals/scripts/setup.js` - Setup script
  - `internals/scripts/clean.js` - Clean script
- **plopfile.js** - Generator configuration
- **Generator commands** from package.json:
  - `npm run generate`
  - `npm run generate:component`
  - `npm run generate:page`
  - `npm run generate:hook`
  - `npm run generate:store`
  - `npm run generate:feature`

This keeps your final project clean and production-ready without boilerplate scaffolding.

---

## Development

### `npm run dev`
Starts the development server running on `http://localhost:3000`. Changes in the application code will be hot-reloaded.

### `npm run build`
Builds your app for production. Optimizes and minifies all files, piping them to the `dist` folder.

### `npm run preview`
Locally preview the production build. Runs the built app on a local server.

## Code Generation

### `npm run generate`
Interactive CLI to generate boilerplate code. You'll be prompted to select what you want to create:
- Component
- Page
- Hook
- Store
- Feature

### Quick Generators

Skip the interactive prompt by using specific generators:

#### `npm run generate:component`
Create a reusable component in `src/components/common` or `src/components/ui`.

Example:
```bash
npm run generate:component
# Enter component name: Button
# Select type: ui
# Creates: src/components/ui/Button.tsx
```

#### `npm run generate:page`
Create a page component in `src/pages`.

Example:
```bash
npm run generate:page
# Enter page name: Settings
# Creates: src/pages/Settings.tsx
```

#### `npm run generate:hook`
Create a custom React hook in `src/hooks`.

Example:
```bash
npm run generate:hook
# Enter hook name (without "use" prefix): WindowSize
# Creates: src/hooks/useWindowSize.ts
```

#### `npm run generate:store`
Create a Zustand store in `src/store`.

Example:
```bash
npm run generate:store
# Enter store name: cart
# Creates: src/store/cart.store.ts
```

#### `npm run generate:feature`
Create a complete feature module with components, hooks, and types in `src/features`.

Example:
```bash
npm run generate:feature
# Enter feature name: UserProfile
# Creates:
#   - src/features/user-profile/index.ts
#   - src/features/user-profile/components/UserProfile.tsx
#   - src/features/user-profile/hooks/useUserProfile.ts
#   - src/features/user-profile/types.ts
```

## Testing

### `npm run test`
Runs your unit tests with Vitest.

### `npm run test:ui`
Opens the Vitest UI for interactive testing.

### `npm run test:coverage`
Runs tests and generates a coverage report.

## Code Quality

### `npm run lint`
Lints your TypeScript/JavaScript code using ESLint.

### `npm run lint:fix`
Lints your code and automatically fixes issues where possible.

### `npm run format`
Formats your code using Prettier.

### `npm run format:check`
Checks if your code is properly formatted without making changes.

### `npm run type-check`
Type-checks your TypeScript code without emitting files.

## Example Workflow

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Generate a new feature:**
   ```bash
   npm run generate:feature
   # Name: Authentication
   ```

3. **Generate additional components:**
   ```bash
   npm run generate:component
   # Name: LoginForm
   # Type: common
   ```

4. **Run tests:**
   ```bash
   npm run test
   ```

5. **Check code quality:**
   ```bash
   npm run lint
   npm run type-check
   ```

6. **Build for production:**
   ```bash
   npm run build
   ```

7. **Preview production build:**
   ```bash
   npm run preview
   ```
