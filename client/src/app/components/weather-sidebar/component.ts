import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherData } from '../../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component.html',
  styleUrls: ['./component.css']
})
export class WeatherSidebarComponent implements OnInit, OnDestroy {
  weather: WeatherData | null = null;
  private subscription: Subscription = new Subscription();

  constructor(public weatherService: WeatherService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.weatherService.weather$.subscribe(weather => {
        this.weather = weather;
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
