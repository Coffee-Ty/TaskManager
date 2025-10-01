import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from '../tasks/tasks';
import { StockMarketComponent } from '../stock-market/stock-market';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TasksComponent, StockMarketComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  activeTab: 'tasks' | 'stocks' = 'tasks';

  setActiveTab(tab: 'tasks' | 'stocks'): void {
    this.activeTab = tab;
  }
}
