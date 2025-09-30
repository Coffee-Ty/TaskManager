# Contributing to Task Manager

Thank you for your interest in contributing to the Task Manager application! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all. By participating, you agree to uphold these values.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your feature or bugfix
4. Make your changes
5. Test your changes thoroughly
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Git

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. **Install dependencies:**
   ```bash
   # Install Angular dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   cd ..
   ```

3. **Set up environment variables:**
   ```bash
   # Copy environment template
   cp server/env.example server/.env
   
   # Edit server/.env and add your API keys
   ```

4. **Start development servers:**
   ```bash
   # Terminal 1: Start the API server
   cd server
   npm run dev
   
   # Terminal 2: Start the Angular application
   npm start
   ```

## Making Changes

### Branch Naming Convention

Use descriptive branch names that indicate the type of change:

- `feature/description` - For new features
- `bugfix/description` - For bug fixes
- `hotfix/description` - For critical bug fixes
- `docs/description` - For documentation updates
- `refactor/description` - For code refactoring

Examples:
- `feature/user-authentication`
- `bugfix/stock-data-caching`
- `docs/api-documentation`

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:
```
feat(stock): add real-time stock price updates
fix(weather): resolve caching issue for weather data
docs(api): update endpoint documentation
```

## Pull Request Process

### Before Submitting

1. **Test your changes:**
   ```bash
   # Run Angular tests
   npm test
   
   # Build the application
   npm run build
   ```

2. **Check code style:**
   - Ensure your code follows Angular style guide
   - Use TypeScript strict mode
   - Follow existing naming conventions

3. **Update documentation:**
   - Update README.md if needed
   - Add JSDoc comments for new functions
   - Update API documentation

### Pull Request Template

When creating a pull request, include:

- **Description**: Clear description of changes
- **Type**: Feature, Bug Fix, Documentation, etc.
- **Testing**: How you tested the changes
- **Breaking Changes**: Any breaking changes
- **Screenshots**: For UI changes
- **Related Issues**: Link to related issues

### Review Process

1. All pull requests require at least one review
2. Address review feedback promptly
3. Keep pull requests focused and reasonably sized
4. Ensure CI/CD checks pass

## Coding Standards

### Angular (Frontend)

- Use Angular 17+ standalone components
- Follow Angular style guide: https://angular.io/guide/styleguide
- Use TypeScript strict mode
- Implement proper error handling
- Use reactive programming with RxJS
- Follow component naming conventions

### Express.js (Backend)

- Use async/await for asynchronous operations
- Implement proper error handling middleware
- Use environment variables for configuration
- Follow RESTful API design principles
- Implement proper logging
- Use CORS middleware appropriately

### General

- Write self-documenting code with clear variable names
- Add comments for complex logic
- Keep functions small and focused
- Use consistent indentation (2 spaces)
- Remove console.log statements before committing

## Testing

### Frontend Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test -- --code-coverage

# Run tests in watch mode
npm run test -- --watch
```

### Backend Testing

```bash
cd server
npm test
```

### Testing Guidelines

- Write unit tests for new functions
- Test error scenarios
- Mock external API calls
- Aim for >80% code coverage
- Test both success and failure paths

## Documentation

### Code Documentation

- Use JSDoc comments for functions and classes
- Document complex algorithms
- Include parameter and return type information
- Provide usage examples where helpful

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error responses
- Keep documentation up to date

## Issue Reporting

### Bug Reports

When reporting bugs, include:

- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node.js version, etc.)
- Screenshots if applicable

### Feature Requests

For feature requests, include:

- Clear description of the feature
- Use case and motivation
- Proposed implementation approach
- Any additional context

## Getting Help

- Check existing issues and discussions
- Join our community discussions
- Ask questions in pull request comments
- Contact maintainers for urgent issues

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes for significant contributions
- GitHub contributor statistics

Thank you for contributing to Task Manager! 🚀
