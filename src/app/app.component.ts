import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherSidebarComponent } from './components/weather-sidebar/component';
import { DashboardComponent } from './components/dashboard/component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WeatherSidebarComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Task Manager';
}

