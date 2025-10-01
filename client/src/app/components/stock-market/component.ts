import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService, StockData } from '../../services/stock.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-market',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component.html',
  styleUrls: ['./component.css']
})
export class StockMarketComponent implements OnInit, OnDestroy {
  stocks: StockData[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.stockService.stocks$.subscribe(stocks => {
        this.stocks = stocks;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getChangeClass(change: number): string {
    return change >= 0 ? 'positive' : 'negative';
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }

  formatChange(change: number): string {
    return change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
  }

  formatChangePercent(changePercent: number): string {
    return changePercent >= 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`;
  }

  formatVolume(volume: number): string {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  }

  refreshStocks(): void {
    this.stockService.fetchStocks();
  }
}
