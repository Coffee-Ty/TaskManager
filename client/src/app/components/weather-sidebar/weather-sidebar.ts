import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherData } from '../../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-sidebar',
  imports: [CommonModule],
  templateUrl: './weather-sidebar.html',
  styleUrls: ['./weather-sidebar.css']
})
export class WeatherSidebarComponent implements OnInit, OnDestroy {
  weather: WeatherData | null = null;
  errorMessage: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(public weatherService: WeatherService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.weatherService.weather$.subscribe(weather => {
        this.weather = weather;
      })
    );
    this.subscription.add(
      this.weatherService.error$.subscribe(error => {
        this.errorMessage = error;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString();
  }
}
