# Release Guide

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) for automated versioning and changelog generation.

## Prerequisites

- Follow [Conventional Commits](https://www.conventionalcommits.org/) specification
- Commits determine version bumps automatically

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature → **MINOR** version bump (0.1.0 → 0.2.0)
- `fix`: Bug fix → **PATCH** version bump (0.1.0 → 0.1.1)
- `perf`: Performance improvement → **PATCH** version bump
- `refactor`: Code refactoring → No version bump
- `docs`: Documentation → No version bump
- `style`: Code style/formatting → No version bump
- `test`: Adding tests → No version bump
- `build`: Build system → No version bump
- `ci`: CI configuration → No version bump
- `chore`: Maintenance → No version bump

### Breaking Changes

Add `BREAKING CHANGE:` in commit body → **MAJOR** version bump (0.1.0 → 1.0.0)

## Examples

```bash
# Patch release (0.1.0 → 0.1.1)
git commit -m "fix(auth): resolve token refresh issue"

# Minor release (0.1.0 → 0.2.0)
git commit -m "feat(dashboard): add analytics widget"

# Major release (0.1.0 → 1.0.0)
git commit -m "feat(api): redesign response format

BREAKING CHANGE: API responses now return data in wrapper object"
```

## Release Commands

### Automatic (Recommended)

Analyzes commits and bumps version automatically:

```bash
npm run release
```

### Manual Override

```bash
# Force specific version bump
npm run release:patch   # 0.1.0 → 0.1.1
npm run release:minor   # 0.1.0 → 0.2.0
npm run release:major   # 0.1.0 → 1.0.0
```

### First Release

```bash
npm run release:first
```

### Dry Run

Preview changes without committing:

```bash
npm run release:dry
```

## Complete Release Workflow

```bash
# 1. Make commits with conventional format
git add .
git commit -m "feat(auth): add OAuth2 support"
git commit -m "fix(dashboard): resolve loading state"

# 2. Run release (automatic version bump)
npm run release

# This will:
# - Analyze commits
# - Bump version in package.json
# - Update CHANGELOG.md
# - Create git commit
# - Create git tag (e.g., v0.2.0)

# 3. Push to trigger GitHub Actions
git push --follow-tags origin main

# 4. GitHub Actions automatically:
# - Runs tests
# - Builds project
# - Creates GitHub Release
# - Uploads build artifacts
```

## Pre-release Versions

```bash
# Alpha
npm run release -- --prerelease alpha
# Creates: v0.2.0-alpha.0

# Beta
npm run release -- --prerelease beta
# Creates: v0.2.0-beta.0

# Release Candidate
npm run release -- --prerelease rc
# Creates: v0.2.0-rc.0
```

## GitHub Release Tags

After pushing tags, view releases at:
```
https://github.com/YOUR_USERNAME/YOUR_REPO/releases
https://github.com/YOUR_USERNAME/YOUR_REPO/tags
```

## What Gets Generated

### CHANGELOG.md
```markdown
## [0.2.0] (2024-01-15)

### ✨ Features
* **auth:** add OAuth2 support ([abc123])

### 🐛 Bug Fixes
* **dashboard:** resolve loading state ([def456])
```

### Git Tag
```
v0.2.0
```

### GitHub Release
Automatically created with:
- Release title: v0.2.0
- Release notes from CHANGELOG
- Build artifacts attached

## Troubleshooting

### Undo Last Release

```bash
# Delete tag locally and remotely
git tag -d v0.2.0
git push origin :refs/tags/v0.2.0

# Reset commit
git reset --hard HEAD~1
```

### Skip Version Bump

```bash
# Only update changelog, no version bump
npm run release -- --skip.bump
```

### Custom Version

```bash
# Set specific version
npm run release -- --release-as 1.2.3
```

## Best Practices

1. ✅ **Use conventional commits consistently**
2. ✅ **Run tests before releasing** (`npm test`)
3. ✅ **Review CHANGELOG before pushing**
4. ✅ **Push with `--follow-tags` to include tags**
5. ✅ **Document breaking changes clearly**
6. ✅ **Use dry-run to preview changes**

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [standard-version](https://github.com/conventional-changelog/standard-version)
