# Task Manager API - NestJS

This is the NestJS version of the Task Manager API, converted from Express.js with proper file separation and modern architecture.

## Project Structure

```
api/
├── src/
│   ├── common/
│   │   ├── dto/
│   │   │   └── api-response.dto.ts      # Response DTOs
│   │   └── interfaces/
│   │       ├── stock.interface.ts        # Stock data interfaces
│   │       └── weather.interface.ts      # Weather data interfaces
│   ├── config/
│   │   └── configuration.ts             # Configuration service
│   ├── stocks/
│   │   ├── stocks.controller.ts         # Stock endpoints
│   │   ├── stocks.service.ts           # Stock business logic
│   │   └── stocks.module.ts            # Stock module
│   ├── weather/
│   │   ├── weather.controller.ts        # Weather endpoints
│   │   ├── weather.service.ts           # Weather business logic
│   │   └── weather.module.ts           # Weather module
│   ├── health/
│   │   ├── health.controller.ts         # Health check endpoint
│   │   └── health.module.ts             # Health module
│   ├── app.module.ts                    # Main application module
│   └── main.ts                          # Application entry point
├── package.json
├── nest-cli.json
├── tsconfig.json
└── env.example
```

## Features

- **Modular Architecture**: Separated into logical modules (stocks, weather, health)
- **Type Safety**: Full TypeScript support with interfaces and DTOs
- **Configuration Management**: Centralized configuration with environment variables
- **Caching**: Built-in caching for API responses
- **Error Handling**: Proper HTTP status codes and error responses
- **Validation**: Request/response validation with class-validator
- **Logging**: Structured logging with NestJS Logger
- **Production-Ready**: No fallback mock data, fails properly when API keys are missing

## API Endpoints

### Stocks
- `GET /api/stocks` - Get all stock data
- `GET /api/stocks/:symbol` - Get specific stock data
- `POST /api/stocks/refresh` - Force refresh stock data

### Weather
- `GET /api/weather` - Get weather data
- `POST /api/weather/refresh` - Force refresh weather data

### Health
- `GET /api/health` - Health check endpoint

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp env.example .env
```

3. Update `.env` with your API keys:
```env
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
```

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## Key Improvements over Express Version

1. **Better Organization**: Clear separation of concerns with modules
2. **Type Safety**: Full TypeScript support with interfaces
3. **Dependency Injection**: Proper DI container for better testability
4. **Configuration Management**: Centralized config with validation
5. **Error Handling**: Consistent error responses
6. **Caching**: Built-in caching mechanism
7. **Validation**: Request/response validation
8. **Logging**: Structured logging
9. **Testing**: Better test structure with NestJS testing utilities
10. **Scalability**: Easy to add new features and modules
