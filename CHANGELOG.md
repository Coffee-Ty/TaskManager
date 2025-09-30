# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- GitHub Actions CI/CD pipeline
- Dependency review workflow
- Issue and pull request templates
- Comprehensive contributing guidelines
- Security audit workflow

### Changed
- Updated .gitignore with Angular-specific patterns
- Enhanced README with badges and additional sections

## [1.0.0] - 2024-01-XX

### Added
- Initial release of Task Manager application
- Angular 17+ frontend with standalone components
- Express.js backend with API middleware
- Task management functionality
- Stock market dashboard with real-time data
- Weather information sidebar
- Server-side rendering (SSR) support
- Intelligent caching for external APIs
- Environment variable configuration
- Comprehensive documentation

### Features
- **Task Management**: Create, edit, and manage tasks
- **Stock Market Dashboard**: Real-time data for major companies (AAPL, GOOGL, MSFT, TSLA, AMZN)
- **Weather Information**: Current weather data for Milwaukee, WI
- **API Integration**: Alpha Vantage and OpenWeatherMap APIs
- **Caching Strategy**: 5-minute stock data cache, 10-minute weather data cache
- **Fallback Data**: Mock data when external APIs fail

### Technical Details
- Frontend: Angular 17+ with TypeScript
- Backend: Express.js with CORS and middleware
- Build: Angular CLI with production optimizations
- Testing: Jasmine and Karma for unit testing
- Development: Concurrent development servers
