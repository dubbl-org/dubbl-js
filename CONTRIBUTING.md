# Contributing to dubbl-js

Thanks for your interest in contributing! This guide will help you get set up and submit your first pull request.

## Code of Conduct

Be kind, respectful, and constructive. We're all here to build good software together.

## Reporting Bugs

Open a [GitHub Issue](https://github.com/dubbl-org/dubbl-js/issues) with:

- A clear title and description
- Steps to reproduce
- Expected vs actual behavior
- SDK version, Node.js version, and OS
- A minimal code snippet if possible

## Requesting Features

Open a [GitHub Discussion](https://github.com/dubbl-org/dubbl-js/discussions) or Issue describing the use case and why you think it would be valuable.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 10+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/dubbl-org/dubbl-js.git
cd dubbl-js

# Install dependencies
pnpm install

# Run type checking
pnpm typecheck

# Run tests
pnpm test

# Build the library
pnpm build
```

### Project Structure

```
src/
├── index.ts           # Main entry point & Dubbl class
├── client.ts          # HTTP client with retries, errors, auth
├── errors.ts          # Typed error classes
├── types.ts           # All TypeScript types and interfaces
└── resources/         # One file per API resource
    ├── accounts.ts
    ├── invoices.ts
    ├── payroll.ts
    └── ...
tests/
└── *.test.ts          # Test files
```

## Pull Request Guidelines

1. **Fork and branch** — Create a branch from `main` with a descriptive name (e.g., `feat/add-credit-notes`, `fix/retry-logic`)
2. **One PR per change** — Keep PRs focused on a single feature or fix
3. **Add tests** — New features and bug fixes should include tests
4. **Type check and test** — Run `pnpm typecheck && pnpm test` before submitting
5. **Keep it clean** — No unrelated formatting or refactoring changes
6. **Write a clear description** — Explain what the PR does and why

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add credit notes resource
fix: handle 429 rate limit with retry-after header
docs: update README with payroll examples
test: add tests for bulk import
chore: update dependencies
```

## Adding a New Resource

1. Create `src/resources/my-resource.ts` following the pattern of existing resources
2. Add types to `src/types.ts`
3. Register the resource in `src/index.ts` (add import, property, and constructor initialization)
4. Add tests in `tests/`
5. Update the resources table in `README.md`

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run a specific test file
pnpm test -- tests/client.test.ts
```

## Building

```bash
# Build for production (ESM + CJS + types)
pnpm build
```

Output goes to `dist/` with:
- `index.js` — ESM
- `index.cjs` — CommonJS
- `index.d.ts` — Type declarations

## Release Process

Releases are managed by maintainers. Version bumps follow [semver](https://semver.org/):

- **Patch** (`0.1.1`): Bug fixes, no API changes
- **Minor** (`0.2.0`): New features, backwards compatible
- **Major** (`1.0.0`): Breaking changes

Publishing to npm is handled by GitHub Actions via npm trusted publishing:

1. Bump the version locally with `pnpm version patch|minor|major`
2. Push the commit and tag
3. Create or publish a GitHub Release for that tag
4. The `.github/workflows/publish.yml` workflow will run the checks and publish to npm

To enable trusted publishing on npm for this repository:

- Open the `dubbl` package settings on npmjs.com
- Add a GitHub Actions trusted publisher
- Set Organization/User to `dubbl-org`
- Set Repository to `dubbl-js`
- Set Workflow filename to `publish.yml`

Notes:

- No `NPM_TOKEN` repository secret is required for publishing once trusted publishing is configured
- The workflow must keep the filename `publish.yml` unless you also update the npm trusted publisher settings
- After confirming trusted publishing works, consider restricting token-based publishing access in npm package settings

## Questions?

Open a [Discussion](https://github.com/dubbl-org/dubbl-js/discussions) or reach out on the Dubbl community channels.
