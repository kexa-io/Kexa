# Development Guide

This guide will help you set up your development environment and understand our development practices.

## Setting Up Development Environment

1. **Prerequisites**
   - Node.js (v18 or higher)
   - pnpm (latest version)
   - Git

2. **Clone and Setup**

   ```bash
   git clone https://github.com/4urcloud/Kexa.git
   cd Kexa
   pnpm install --frozen-lockfile
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Configure necessary environment variables

## Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Enable strict mode
- Document public APIs with JSDoc comments
- Follow the existing code style

### Code Style

- Use 2 spaces for indentation
- Use meaningful variable and function names
- Keep functions small and focused
- Write self-documenting code
- Add comments for complex logic

### Best Practices

- Follow SOLID principles
- Write testable code
- Handle errors appropriately
- Use async/await for asynchronous operations
- Keep dependencies minimal

## Git Workflow

1. **Branch Naming**
   - Feature: `feature/description`
   - Bug fix: `fix/description`
   - Documentation: `docs/description`
   - Performance: `perf/description`

2. **Commit Messages**
   - Use conventional commits format
   - Start with type: feat, fix, docs, style, refactor, test, chore
   - Keep messages clear and concise

3. **Pull Requests**
   - Create PR against main branch
   - Fill out PR template completely
   - Ensure CI passes
   - Request review from maintainers

## Building and Running

### Development Mode

```bash
pnpm run dev
```

### Production Build

```bash
pnpm run build
pnpm run start
```

### Running Tests

```bash
pnpm run test
```

## Debugging

1. **VS Code Configuration**
   - Use the provided launch configurations
   - Enable source maps
   - Use the debugger for Node.js

2. **Logging**
   - Use the logging system
   - Add appropriate log levels
   - Include relevant context

## Documentation

- Update documentation for new features
- Include code examples
- Document breaking changes
- Keep README.md up to date

## Need Help?

- Check existing issues and discussions
- Join our community chat
- Contact maintainers
- Read our [FAQ](../FAQ.md)
