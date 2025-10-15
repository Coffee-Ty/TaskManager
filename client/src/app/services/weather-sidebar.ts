import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherData } from './weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-sidebar',
  imports: [CommonModule],
  templateUrl: '../components/weather-sidebar/weather-sidebar.html',
  styleUrls: ['../components/weather-sidebar/weather-sidebar.css']
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
}
