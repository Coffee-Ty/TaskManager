export class ApiResponseDto<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: number;
}

export class StockDataDto {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: number;
}

export class WeatherDataDto {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  city: string;
  icon: string;
  timestamp: number;
}
