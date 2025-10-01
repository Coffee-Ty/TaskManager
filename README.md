# Task Manager Application

[![CI/CD Pipeline](https://github.com/Coffee-Ty/TaskManager/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/Coffee-Ty/TaskManager/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-17+-red.svg)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

A modern Angular 17+ application with NestJS backend for managing tasks, displaying stock market data, and weather information.

## Features

- **Task Management**: Create, edit, and manage tasks with a clean interface
- **Stock Market Dashboard**: Real-time stock data for major companies (AAPL, GOOGL, MSFT, TSLA, AMZN)
- **Weather Information**: Current weather data for Milwaukee, WI
- **Server-Side Rendering (SSR)**: Built with Angular Universal for better SEO and performance
- **API Backend**: NestJS server for handling external API calls with caching

## Project Structure

```
task-manager/
├── client/                 # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Angular components
│   │   │   └── services/   # Angular services
│   │   └── assets/        # Static assets
│   └── dist/              # Angular build output
├── api/                   # NestJS API server
│   ├── src/
│   │   ├── stocks/        # Stock module
│   │   ├── weather/       # Weather module
│   │   ├── health/        # Health module
│   │   └── common/        # Shared interfaces and DTOs
│   └── dist/              # NestJS build output
├── web/                   # Static file server
└── package.json           # Root package.json with workspace scripts
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- API keys for:
  - Alpha Vantage (for stock data)
  - OpenWeatherMap (for weather data)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Coffee-Ty/TaskManager.git
cd task-manager
```

### 2. Install Dependencies
```bash
# Install all dependencies (uses workspaces)
npm run install:all

# Or install individually:
# npm install                    # Root dependencies
# cd client && npm install      # Angular dependencies
# cd ../api && npm install      # NestJS dependencies
```

### 3. Environment Configuration
```bash
# Copy environment template
cp api/env.example api/.env

# Edit api/.env and add your API keys:
# ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here
# OPENWEATHER_API_KEY=your_openweather_api_key_here
# PORT=3001
```

### 4. Start the Application

**Development Mode:**
```bash
# Start both client and API server concurrently
npm run dev:all

# Or start individually:
# Terminal 1: Start the NestJS API server
npm run dev:api

# Terminal 2: Start the Angular application
npm run dev:client
```

**Production Mode:**
```bash
# Build everything
npm run build:all

# Start the NestJS API server
npm run start:api
```

## API Endpoints

The NestJS server provides the following endpoints:

### Stock Market
- `GET /api/stocks` - Get all stock data
- `GET /api/stocks/:symbol` - Get specific stock data
- `POST /api/stocks/refresh` - Force refresh stock data

### Weather
- `GET /api/weather` - Get current weather data
- `POST /api/weather/refresh` - Force refresh weather data

### System
- `GET /api/health` - Server health check

## Caching Strategy

- **Stock Data**: Cached for 5 minutes
- **Weather Data**: Cached for 10 minutes
- **Automatic Refresh**: Data is automatically refreshed when cache expires
- **Fallback Data**: Provides mock data when external APIs fail

## Development

### Available Scripts

**Angular Application:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run serve:ssr:task-manager` - Serve SSR build

**NestJS API Server:**
- `npm run start:prod` - Start production server
- `npm run start:dev` - Start development server with auto-restart

### Architecture

- **Frontend**: Angular 17+ with standalone components
- **Backend**: NestJS with modular architecture for API management
- **SSR**: Angular Universal for server-side rendering
- **Caching**: Intelligent caching to reduce API calls
- **Security**: API keys stored in environment variables

## Deployment

1. Build the application: `npm run build:all`
2. Set up environment variables in production
3. Start the NestJS server: `npm run start:api`
4. Configure reverse proxy (nginx/Apache) if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to:

- Report bugs
- Suggest features
- Submit pull requests
- Follow our coding standards

## Support

- 📖 [Documentation](README.md)
- 🐛 [Report a Bug](https://github.com/Coffee-Ty/TaskManager/issues/new?template=bug_report.yml)
- 💡 [Request a Feature](https://github.com/Coffee-Ty/TaskManager/issues/new?template=feature_request.yml)
- 💬 [Discussions](https://github.com/Coffee-Ty/TaskManager/discussions)

## Roadmap

- [ ] User authentication and authorization
- [ ] Task categories and tags
- [ ] Advanced filtering and sorting
- [ ] Data export functionality
- [ ] Mobile app (React Native)
- [ ] Real-time notifications
- [ ] Team collaboration features

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and updates.

## License

MIT License - see [LICENSE](LICENSE) file for details

## Acknowledgments

- [Angular](https://angular.io/) - The web framework
- [NestJS](https://nestjs.com/) - The web framework
- [Alpha Vantage](https://www.alphavantage.co/) - Stock market data API
- [OpenWeatherMap](https://openweathermap.org/) - Weather data API
