export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  api: {
    alphaVantage: {
      apiKey: process.env.ALPHA_VANTAGE_API_KEY,
      baseUrl: 'https://www.alphavantage.co/query',
    },
    openWeather: {
      apiKey: process.env.OPENWEATHER_API_KEY,
      baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
    },
  },
  cache: {
    stockCacheDuration: 5 * 60 * 1000, // 5 minutes
    weatherCacheDuration: 10 * 60 * 1000, // 10 minutes
  },
  coordinates: {
    milwaukee: {
      lat: 43.0389,
      lon: -87.9065,
    },
  },
  stockSymbols: ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'],
});
