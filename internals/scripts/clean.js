const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve))
}

const filesToDelete = [
  // Example pages
  'src/pages/Dashboard.tsx',
  'src/pages/Login.tsx',
  'src/pages/Home.tsx',

  // Example stores
  'src/store/auth.store.ts',

  // Example components
  'src/components/common/AuthLayout.tsx',
  'src/components/common/ProtectedRoute.tsx',
]

const filesToCreate = {
  'src/pages/Home.tsx': `export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Welcome to Your App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Start building something amazing!
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="https://vitejs.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Vite Docs
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            React Docs
          </a>
        </div>
      </div>
    </div>
  )
}
`,
  'src/router/index.tsx': `import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@components/common/MainLayout'
import HomePage from '@pages/Home'
import NotFoundPage from '@pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
`,
}

async function clean() {
  console.log('\n🧹 Cleaning example code...\n')
  console.log('This will remove example pages, components, and stores.')
  console.log('You will start with a minimal, clean boilerplate.\n')

  const answer = await question('Are you sure you want to continue? (y/N): ')

  if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
    console.log('❌ Cleaning cancelled.')
    rl.close()
    process.exit(0)
  }

  console.log('\n🗑️  Deleting example files...')

  // Delete files
  filesToDelete.forEach((file) => {
    const filePath = path.join(process.cwd(), file)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      console.log(`  ✅ Deleted: ${file}`)
    }
  })

  console.log('\n📝 Creating minimal starter files...')

  // Create new files
  Object.entries(filesToCreate).forEach(([file, content]) => {
    const filePath = path.join(process.cwd(), file)
    fs.writeFileSync(filePath, content)
    console.log(`  ✅ Created: ${file}`)
  })

  // Self-destruct - remove clean script
  console.log('\n🔥 Removing clean script (this is irreversible)...')
  const cleanScriptPath = path.join(
    process.cwd(),
    'internals/scripts/clean.js'
  )
  fs.unlinkSync(cleanScriptPath)
  console.log('✅ Clean script removed')

  // Remove clean command from package.json
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  delete packageJson.scripts.clean
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log('✅ Clean command removed from package.json')

  // Remove the entire internals folder and plopfile
  console.log('\n🧹 Removing internals folder and generators...')
  const internalsPath = path.join(process.cwd(), 'internals')
  if (fs.existsSync(internalsPath)) {
    fs.rmSync(internalsPath, { recursive: true, force: true })
    console.log('✅ Internals folder removed')
  }

  // Remove plopfile
  const plopfilePath = path.join(process.cwd(), 'plopfile.js')
  if (fs.existsSync(plopfilePath)) {
    fs.unlinkSync(plopfilePath)
    console.log('✅ Plopfile removed')
  }

  // Remove generator commands from package.json
  delete packageJson.scripts.generate
  delete packageJson.scripts['generate:component']
  delete packageJson.scripts['generate:page']
  delete packageJson.scripts['generate:hook']
  delete packageJson.scripts['generate:store']
  delete packageJson.scripts['generate:feature']
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log('✅ Generator commands removed from package.json')

  console.log('\n✨ Clean complete! Your boilerplate is now minimal and ready.')
  console.log('\n📚 Next steps:')
  console.log('  1. Start building your app!')
  console.log('  2. Create files manually or use your own generators')
  console.log('  3. Run: npm run dev\n')

  rl.close()
  process.exit(0)
}

clean().catch((error) => {
  console.error('Error during cleaning:', error)
  rl.close()
  process.exit(1)
})
