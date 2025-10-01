import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherSidebarComponent } from './components/weather-sidebar/weather-sidebar';
import { DashboardComponent } from './components/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [CommonModule, WeatherSidebarComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Task Manager';
}

