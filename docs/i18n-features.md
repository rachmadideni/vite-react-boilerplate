# Feature-Specific Translations

This boilerplate supports feature-scoped translations, allowing each feature module to have its own translation messages.

## Overview

Instead of putting all translations in global `locales/` files, you can define feature-specific messages within each feature directory:

```
src/features/user-profile/
├── components/
├── hooks/
├── messages.ts        ← Feature translations
└── types.ts
```

## Creating Feature Messages

### messages.ts Pattern

```typescript
/*
 * UserProfile Messages
 *
 * This contains all the text for the UserProfile feature.
 */
import { defineMessages } from 'react-intl'

export const scope = 'app.features.userProfile'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'User Profile',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Manage your account settings',
  },
  saveButton: {
    id: `${scope}.saveButton`,
    defaultMessage: 'Save Changes',
  },
  successMessage: {
    id: `${scope}.success`,
    defaultMessage: 'Profile updated successfully!',
  },
})
```

### Key Points

1. **Scope** - Use consistent naming: `app.features.{featureName}`
2. **Message IDs** - Prefix with scope: `${scope}.messageName`
3. **Default Messages** - Always provide English defaults
4. **Export** - Default export the messages object

## Using in Components

```typescript
import { useIntl } from 'react-intl'
import messages from '../messages'

export function UserProfile() {
  const intl = useIntl()
  
  return (
    <div>
      <h1>{intl.formatMessage(messages.header)}</h1>
      <p>{intl.formatMessage(messages.description)}</p>
      <button>
        {intl.formatMessage(messages.saveButton)}
      </button>
    </div>
  )
}
```

## With Variables

```typescript
// messages.ts
greeting: {
  id: `${scope}.greeting`,
  defaultMessage: 'Hello, {name}!',
},

// component
intl.formatMessage(messages.greeting, { name: 'John' })
// Output: "Hello, John!"
```

## Pluralization

```typescript
// messages.ts
itemCount: {
  id: `${scope}.itemCount`,
  defaultMessage: '{count, plural, =0 {No items} one {# item} other {# items}}',
},

// component
intl.formatMessage(messages.itemCount, { count: 0 })  // "No items"
intl.formatMessage(messages.itemCount, { count: 1 })  // "1 item"
intl.formatMessage(messages.itemCount, { count: 5 })  // "5 items"
```

## Date/Time Formatting

```typescript
// messages.ts
lastUpdated: {
  id: `${scope}.lastUpdated`,
  defaultMessage: 'Last updated: {date, date, short}',
},

// component
intl.formatMessage(messages.lastUpdated, { date: new Date() })
// Output: "Last updated: 3/7/26"
```

## Exporting from Feature

```typescript
// src/features/user-profile/index.ts
export * from './components/UserProfile'
export * from './hooks/useUserProfile'
export * from './types'
export { default as messages } from './messages'
```

This allows importing messages from the feature:

```typescript
import { UserProfile, messages } from '@features/user-profile'
```

## Adding Translations

When you need to translate messages to other languages:

### 1. Extract Messages (Optional)

Use `formatjs` CLI to extract all messages:

```bash
npm install -D @formatjs/cli

# Extract to JSON
npx formatjs extract 'src/**/*.ts*' --out-file lang/en.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'
```

### 2. Create Translation Files

```typescript
// src/locales/id/features/userProfile.ts
export default {
  'app.features.userProfile.header': 'Profil Pengguna',
  'app.features.userProfile.description': 'Kelola pengaturan akun Anda',
  'app.features.userProfile.saveButton': 'Simpan Perubahan',
  'app.features.userProfile.success': 'Profil berhasil diperbarui!',
}
```

### 3. Combine with Global Messages

```typescript
// src/locales/id/messages.ts
import userProfileMessages from './features/userProfile'

export default {
  ...globalMessages,
  ...userProfileMessages,
}
```

## Generator Support

When you use `npm run generate:feature`, messages.ts is automatically created:

```bash
npm run generate:feature
# Name: Products
# Creates: src/features/products/messages.ts (with template)
```

## Benefits

1. **Co-location** - Translations live with the feature code
2. **Maintainability** - Easy to find and update feature translations
3. **Scalability** - No giant global translation files
4. **Type Safety** - TypeScript knows what messages exist
5. **Lazy Loading** - Can load feature translations on demand

## Example: Dashboard Feature

```typescript
// src/features/dashboard/messages.ts
import { defineMessages } from 'react-intl'

export const scope = 'app.features.dashboard'

export default defineMessages({
  welcomeHeader: {
    id: `${scope}.welcome.header`,
    defaultMessage: 'Welcome to Dashboard',
  },
  statsTitle: {
    id: `${scope}.stats.title`,
    defaultMessage: 'Statistics',
  },
  viewDetails: {
    id: `${scope}.viewDetails`,
    defaultMessage: 'View Details',
  },
})

// src/features/dashboard/components/DashboardStats.tsx
import { useIntl } from 'react-intl'
import messages from '../messages'

export function DashboardStats() {
  const intl = useIntl()
  
  return (
    <div>
      <h3>{intl.formatMessage(messages.statsTitle)}</h3>
      <button>{intl.formatMessage(messages.viewDetails)}</button>
    </div>
  )
}
```

## Resources

- [react-intl Documentation](https://formatjs.io/docs/react-intl/)
- [ICU Message Format](https://formatjs.io/docs/core-concepts/icu-syntax/)
- [Pluralization Rules](https://formatjs.io/docs/core-concepts/icu-syntax/#plural-format)
