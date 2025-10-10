import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  city: string;
  icon: string;
  timestamp: number;
}

interface WeatherApiResponse {
  success: boolean;
  data: WeatherData;
  timestamp: number;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly SERVER_URL = 'http://localhost:3001/api';
  
  private weatherSubject = new BehaviorSubject<WeatherData | null>(null);
  public weather$ = this.weatherSubject.asObservable();
  
  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchWeather();
    // Update weather every 10 minutes
    setInterval(() => this.fetchWeather(), 600000);
  }

  fetchWeather(): void {
    this.errorSubject.next(null);
    this.http.get<WeatherApiResponse>(`${this.SERVER_URL}/weather`).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.error || 'Failed to fetch weather data');
      }),
      catchError(error => {
        console.error('Error fetching weather from server:', error);
        throw error;
      })
    ).subscribe({
      next: (weather) => {
        this.weatherSubject.next(weather);
        this.errorSubject.next(null);
      },
      error: (error) => {
        console.error('Failed to load weather data:', error);
        this.errorSubject.next('Unable to load weather data. Please check your API configuration.');
        this.weatherSubject.next(null);
      }
    });
  }

  getCurrentWeather(): WeatherData | null {
    return this.weatherSubject.value;
  }
}
