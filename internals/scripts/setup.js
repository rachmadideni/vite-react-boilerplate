const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve))
}

async function setup() {
  console.log('\n🚀 Setting up your new project...\n')

  // Ask for project name
  const projectName = await question(
    'What is your project name? (press Enter to skip): '
  )

  if (projectName.trim()) {
    // Update package.json with new project name
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    packageJson.name = projectName.trim().toLowerCase().replace(/\s+/g, '-')
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
    console.log(`✅ Updated package.json with project name: ${packageJson.name}`)
  }

  // Clean git history
  const answer = await question(
    '\nDo you want to remove the existing git history and start fresh? (y/N): '
  )

  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    try {
      const gitDir = path.join(process.cwd(), '.git')
      if (fs.existsSync(gitDir)) {
        // Remove .git directory
        fs.rmSync(gitDir, { recursive: true, force: true })
        console.log('✅ Removed existing git history')

        // Initialize new git repository
        execSync('git init', { stdio: 'inherit' })
        console.log('✅ Initialized new git repository')

        // Create initial commit
        execSync('git add .', { stdio: 'inherit' })
        execSync('git commit -m "Initial commit from viteamin"', {
          stdio: 'inherit',
        })
        console.log('✅ Created initial commit')
      }
    } catch (error) {
      console.error('❌ Error cleaning git history:', error.message)
    }
  }

  // Install dependencies
  console.log('\n📦 Installing dependencies...\n')
  try {
    execSync('npm install', { stdio: 'inherit' })
    console.log('\n✅ Dependencies installed successfully')
  } catch (error) {
    console.error('❌ Error installing dependencies:', error.message)
    process.exit(1)
  }

  // Self-destruct - remove setup script
  console.log('\n🔥 Removing setup script (this is irreversible)...')
  const setupScriptPath = path.join(
    process.cwd(),
    'internals/scripts/setup.js'
  )
  fs.unlinkSync(setupScriptPath)
  console.log('✅ Setup script removed')

  // Remove setup command from package.json
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  delete packageJson.scripts.setup
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log('✅ Setup command removed from package.json')

  // Check if clean script still exists
  const cleanScriptPath = path.join(
    process.cwd(),
    'internals/scripts/clean.js'
  )
  const cleanScriptExists = fs.existsSync(cleanScriptPath)

  // If clean script doesn't exist, remove the entire internals folder
  if (!cleanScriptExists) {
    console.log('\n🧹 Removing internals folder...')
    const internalsPath = path.join(process.cwd(), 'internals')
    if (fs.existsSync(internalsPath)) {
      fs.rmSync(internalsPath, { recursive: true, force: true })
      console.log('✅ Internals folder removed')
    }

    // Remove plopfile since generators are gone
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
  }

  console.log('\n✨ Setup complete! Your project is ready.')
  console.log('\n📚 Next steps:')
  console.log('  1. Run: npm run dev')
  if (cleanScriptExists) {
    console.log('  2. Run: npm run clean (to remove example code)')
    console.log('  3. Start building your app!')
  } else {
    console.log('  2. Start building your app!')
  }
  console.log()

  rl.close()
  process.exit(0)
}

setup().catch((error) => {
  console.error('Error during setup:', error)
  rl.close()
  process.exit(1)
})
