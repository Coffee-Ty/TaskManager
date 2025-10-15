import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService, StockData } from '../../services/stock.service';
import { NumberCompressorPipe } from '../../pipes/number-compressor.pipe';
import { SignedNumberPipe } from '../../pipes/signed-number.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-market',
  imports: [CommonModule, NumberCompressorPipe, SignedNumberPipe],
  templateUrl: './stock-market.html',
  styleUrls: ['./stock-market.css']
})
export class StockMarketComponent implements OnInit, OnDestroy {
  stocks: StockData[] = [];
  errorMessage: string | null = null;
  private subscription: Subscription = new Subscription();


  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.stockService.stocks$.subscribe(stocks => {
        this.stocks = stocks;
      })
    );
    this.subscription.add(
      this.stockService.error$.subscribe(error => {
        this.errorMessage = error;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshStocks(): void {
    this.stockService.fetchStocks();
  }
}
