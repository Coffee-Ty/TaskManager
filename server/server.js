const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:4200', // Angular dev server
  credentials: true
}));
app.use(express.json());

// In-memory data storage
let stockData = [];
let weatherData = null;
let lastStockUpdate = 0;
let lastWeatherUpdate = 0;

// Cache duration (in milliseconds)
const STOCK_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const WEATHER_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Stock symbols to track
const STOCK_SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];

// API Configuration
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const MILWAUKEE_COORDS = { lat: 43.0389, lon: -87.9065 };

// Validate API keys
if (!OPENWEATHER_API_KEY) {
  console.warn('Warning: OPENWEATHER_API_KEY not set. Weather data will use fallback values.');
}

// Helper function to check if cache is valid
const isCacheValid = (lastUpdate, cacheDuration) => {
  return Date.now() - lastUpdate < cacheDuration;
};

// Stock API functions
const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: ALPHA_VANTAGE_API_KEY
      }
    });

    const quote = response.data['Global Quote'];
    if (quote && quote['01. symbol']) {
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: parseInt(quote['06. volume']),
        timestamp: Date.now()
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error.message);
    // Return fallback data
    const fallbackPrices = [150.25, 2800.50, 350.75, 800.00, 3200.00];
    const fallbackChanges = [2.15, -15.30, 5.75, -12.50, 8.25];
    const symbolIndex = STOCK_SYMBOLS.indexOf(symbol);
    
    return {
      symbol: symbol,
      price: fallbackPrices[symbolIndex] + (Math.random() - 0.5) * 10,
      change: fallbackChanges[symbolIndex] + (Math.random() - 0.5) * 2,
      changePercent: (fallbackChanges[symbolIndex] / fallbackPrices[symbolIndex]) * 100,
      volume: Math.floor(Math.random() * 10000000) + 1000000,
      timestamp: Date.now()
    };
  }
};

const updateStockData = async () => {
  try {
    const stockPromises = STOCK_SYMBOLS.map(symbol => fetchStockData(symbol));
    const stocks = await Promise.all(stockPromises);
    stockData = stocks.filter(stock => stock !== null);
    lastStockUpdate = Date.now();
    console.log('Stock data updated successfully');
  } catch (error) {
    console.error('Error updating stock data:', error.message);
  }
};

// Weather API functions
const fetchWeatherData = async () => {
  try {
    if (!OPENWEATHER_API_KEY) {
      throw new Error('OpenWeather API key not configured');
    }
    
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: MILWAUKEE_COORDS.lat,
        lon: MILWAUKEE_COORDS.lon,
        appid: OPENWEATHER_API_KEY,
        units: 'imperial'
      }
    });

    return {
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: Math.round(response.data.wind.speed),
      city: response.data.name,
      icon: response.data.weather[0].icon,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    // Return fallback data
    return {
      temperature: 9000,
      description: 'Partly cloudy',
      humidity: 65,
      windSpeed: 8,
      city: 'Milwaukee',
      icon: '02d',
      timestamp: Date.now()
    };
  }
};

const updateWeatherData = async () => {
  try {
    weatherData = await fetchWeatherData();
    lastWeatherUpdate = Date.now();
    console.log('Weather data updated successfully');
  } catch (error) {
    console.error('Error updating weather data:', error.message);
  }
};

// API Routes

// Get all stocks
app.get('/api/stocks', async (req, res) => {
  try {
    // Check if cache is valid
    if (!isCacheValid(lastStockUpdate, STOCK_CACHE_DURATION)) {
      await updateStockData();
    }
    
    res.json({
      success: true,
      data: stockData,
      timestamp: lastStockUpdate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stock data',
      data: stockData // Return cached data even on error
    });
  }
});

// Get specific stock
app.get('/api/stocks/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    
    // Check if cache is valid
    if (!isCacheValid(lastStockUpdate, STOCK_CACHE_DURATION)) {
      await updateStockData();
    }
    
    const stock = stockData.find(s => s.symbol === symbol);
    
    if (stock) {
      res.json({
        success: true,
        data: stock,
        timestamp: lastStockUpdate
      });
    } else {
      res.status(404).json({
        success: false,
        error: `Stock symbol ${symbol} not found`
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stock data'
    });
  }
});

// Get weather data
app.get('/api/weather', async (req, res) => {
  try {
    // Check if cache is valid
    if (!isCacheValid(lastWeatherUpdate, WEATHER_CACHE_DURATION)) {
      await updateWeatherData();
    }
    
    res.json({
      success: true,
      data: weatherData,
      timestamp: lastWeatherUpdate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weather data',
      data: weatherData // Return cached data even on error
    });
  }
});

// Force refresh endpoints
app.post('/api/stocks/refresh', async (req, res) => {
  try {
    await updateStockData();
    res.json({
      success: true,
      message: 'Stock data refreshed successfully',
      data: stockData,
      timestamp: lastStockUpdate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to refresh stock data'
    });
  }
});

app.post('/api/weather/refresh', async (req, res) => {
  try {
    await updateWeatherData();
    res.json({
      success: true,
      message: 'Weather data refreshed successfully',
      data: weatherData,
      timestamp: lastWeatherUpdate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to refresh weather data'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: Date.now(),
    uptime: process.uptime()
  });
});

// Initialize data on server start
const initializeServer = async () => {
  console.log('Initializing server...');
  await updateStockData();
  await updateWeatherData();
  
  // Set up periodic updates
  setInterval(updateStockData, STOCK_CACHE_DURATION);
  setInterval(updateWeatherData, WEATHER_CACHE_DURATION);
  
  console.log('Server initialized successfully');
};

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeServer();
});

module.exports = app;
