import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from '../tasks/component';
import { StockMarketComponent } from '../stock-market/component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TasksComponent, StockMarketComponent],
  templateUrl: './component.html',
  styleUrl: './component.css'
})
export class DashboardComponent {
  activeTab: 'tasks' | 'stocks' = 'tasks';

  setActiveTab(tab: 'tasks' | 'stocks'): void {
    this.activeTab = tab;
  }
}
