export default function (plop) {
  // Component generator
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true
          }
          return 'Component name is required'
        },
      },
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: ['common', 'ui'],
        default: 'common',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{type}}/{{pascalCase name}}.tsx',
        templateFile: 'internals/generators/component.hbs',
      },
    ],
  })

  // Page generator
  plop.setGenerator('page', {
    description: 'Create a page component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Page name:',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true
          }
          return 'Page name is required'
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{pascalCase name}}.tsx',
        templateFile: 'internals/generators/page.hbs',
      },
    ],
  })

  // Hook generator
  plop.setGenerator('hook', {
    description: 'Create a custom React hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name (without "use" prefix):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true
          }
          return 'Hook name is required'
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/hooks/use{{pascalCase name}}.ts',
        templateFile: 'internals/generators/hook.hbs',
      },
    ],
  })

  // Store generator
  plop.setGenerator('store', {
    description: 'Create a Zustand store',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Store name:',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true
          }
          return 'Store name is required'
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/store/{{camelCase name}}.store.ts',
        templateFile: 'internals/generators/store.hbs',
      },
    ],
  })

  // Feature generator
  plop.setGenerator('feature', {
    description: 'Create a feature module with components, hooks, and types',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Feature name:',
        validate: (value) => {
          if (/.+/.test(value)) {
            return true
          }
          return 'Feature name is required'
        },
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/features/{{kebabCase name}}',
        templateFiles: 'internals/generators/feature/**/*.hbs',
        base: 'internals/generators/feature',
      },
    ],
  })
}
