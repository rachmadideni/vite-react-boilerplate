# Internals

This folder contains the boilerplate's internal infrastructure that helps you get started quickly. It will be automatically removed after you run `npm run clean` to keep your final project clean.

## Structure

```
internals/
├── generators/          # Plop templates for code generation
│   ├── component.hbs   # Component template
│   ├── page.hbs        # Page template
│   ├── hook.hbs        # Hook template
│   ├── store.hbs       # Zustand store template
│   └── feature/        # Feature module templates
│       ├── index.ts.hbs
│       ├── types.ts.hbs
│       ├── components/{{pascalCase name}}.tsx.hbs
│       └── hooks/use{{pascalCase name}}.ts.hbs
└── scripts/
    ├── setup.js        # Project initialization script
    └── clean.js        # Example code removal script
```

## Generators

Templates used by Plop to generate boilerplate code. Available via:
- `npm run generate` - Interactive menu
- `npm run generate:component` - Generate a component
- `npm run generate:page` - Generate a page
- `npm run generate:hook` - Generate a custom hook
- `npm run generate:store` - Generate a Zustand store
- `npm run generate:feature` - Generate a feature module

## Scripts

### setup.js
Initializes your new project:
- Updates package.json with your project name
- Optionally removes git history and creates a fresh repo
- Installs dependencies
- Self-destructs after completion

Run with: `npm run setup`

### clean.js
Removes example code and boilerplate infrastructure:
- Deletes example pages, components, and stores
- Creates minimal starter files
- Removes the entire `internals/` folder
- Removes `plopfile.js`
- Removes generator commands from package.json
- Self-destructs after completion

Run with: `npm run clean`

## Customization

If you want to customize the generators before running `npm run clean`:

1. Edit templates in `generators/` to change the generated code
2. Edit `plopfile.js` in the root to modify generator logic
3. Copy this folder to preserve it after running clean

## Lifecycle

1. **Initial state**: User clones the boilerplate with `internals/` folder
2. **After setup**: `internals/scripts/setup.js` is removed
3. **After clean**: Entire `internals/` folder is removed along with `plopfile.js`

This keeps your final project clean and free from boilerplate scaffolding code.
