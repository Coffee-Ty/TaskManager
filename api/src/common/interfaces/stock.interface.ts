export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: number;
}

export interface AlphaVantageResponse {
  'Global Quote': {
    '01. symbol': string;
    '05. price': string;
    '06. volume': string;
    '09. change': string;
    '10. change percent': string;
  };
}
