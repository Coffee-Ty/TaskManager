import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  
  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchStocks();
    // Update stocks every 5 minutes
    setInterval(() => this.fetchStocks(), 300000);
  }

  fetchStocks(): void {
    this.errorSubject.next(null);
    this.http.get<StockApiResponse>(`${this.SERVER_URL}/stocks`).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.error || 'Failed to fetch stock data');
      }),
      catchError(error => {
        console.error('Error fetching stocks from server:', error);
        throw error;
      })
    ).subscribe({
      next: (stocks) => {
        this.stocksSubject.next(stocks);
        this.errorSubject.next(null);
      },
      error: (error) => {
        console.error('Failed to load stock data:', error);
        this.errorSubject.next('Unable to load stock data. Please check your API configuration.');
        this.stocksSubject.next([]);
      }
    });
  }

  getCurrentStocks(): StockData[] {
    return this.stocksSubject.value;
  }
}
