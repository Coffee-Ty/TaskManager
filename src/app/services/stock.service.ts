import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: number;
}

interface StockApiResponse {
  success: boolean;
  data: StockData[];
  timestamp: number;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly SERVER_URL = 'http://localhost:3001/api';
  
  private stocksSubject = new BehaviorSubject<StockData[]>([]);
  public stocks$ = this.stocksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchStocks();
    // Update stocks every 5 minutes
    setInterval(() => this.fetchStocks(), 300000);
  }

  fetchStocks(): void {
    this.http.get<StockApiResponse>(`${this.SERVER_URL}/stocks`).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.error || 'Failed to fetch stock data');
      }),
      catchError(error => {
        console.error('Error fetching stocks from server:', error);
        // Return fallback data if server fails
        const fallbackPrices = [150.25, 2800.50, 350.75, 800.00, 3200.00];
        const fallbackChanges = [2.15, -15.30, 5.75, -12.50, 8.25];
        const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
        
        return [symbols.map((symbol, index) => ({
          symbol: symbol,
          price: fallbackPrices[index] + (Math.random() - 0.5) * 10,
          change: fallbackChanges[index] + (Math.random() - 0.5) * 2,
          changePercent: (fallbackChanges[index] / fallbackPrices[index]) * 100,
          volume: Math.floor(Math.random() * 10000000) + 1000000,
          timestamp: Date.now()
        }))];
      })
    ).subscribe(stocks => {
      this.stocksSubject.next(stocks);
    });
  }

  getCurrentStocks(): StockData[] {
    return this.stocksSubject.value;
  }
}
