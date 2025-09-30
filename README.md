# Task Manager Application

[![CI/CD Pipeline](https://github.com/Coffee-Ty/TaskManager/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/Coffee-Ty/TaskManager/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-17+-red.svg)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

A modern Angular 17+ application with Express.js backend for managing tasks, displaying stock market data, and weather information.

## Features

- **Task Management**: Create, edit, and manage tasks with a clean interface
- **Stock Market Dashboard**: Real-time stock data for major companies (AAPL, GOOGL, MSFT, TSLA, AMZN)
- **Weather Information**: Current weather data for Milwaukee, WI
- **Server-Side Rendering (SSR)**: Built with Angular Universal for better SEO and performance
- **API Middleware**: Express.js server for handling external API calls with caching

## Project Structure

```
task-manager/
├── src/                    # Angular application source
│   ├── app/
│   │   ├── components/     # Angular components
│   │   └── services/      # Angular services
│   └── assets/            # Static assets
├── server/                # Express.js API server
│   ├── server.js         # Main server file
│   ├── package.json      # Server dependencies
│   └── env.example       # Environment variables template
└── dist/                  # Build output (excluded from git)
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
# Install Angular dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 3. Environment Configuration
```bash
# Copy environment template
cp server/env.example server/.env

# Edit server/.env and add your API keys:
# ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here
# OPENWEATHER_API_KEY=your_openweather_api_key_here
# PORT=3001
```

### 4. Start the Application

**Development Mode:**
```bash
# Terminal 1: Start the API server
cd server
npm run dev

# Terminal 2: Start the Angular application
npm start
```

**Production Mode:**
```bash
# Build the Angular application
npm run build

# Start the API server
cd server
npm start
```

## API Endpoints

The Express server provides the following endpoints:

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

**Express Server:**
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-restart

### Architecture

- **Frontend**: Angular 17+ with standalone components
- **Backend**: Express.js with middleware for API management
- **SSR**: Angular Universal for server-side rendering
- **Caching**: Intelligent caching to reduce API calls
- **Security**: API keys stored in environment variables

## Deployment

1. Build the Angular application: `npm run build`
2. Set up environment variables in production
3. Start the Express server: `cd server && npm start`
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
- [Express.js](https://expressjs.com/) - The web server
- [Alpha Vantage](https://www.alphavantage.co/) - Stock market data API
- [OpenWeatherMap](https://openweathermap.org/) - Weather data API
