import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { StockData } from '../common/interfaces/stock.interface';
import { AlphaVantageResponse } from '../common/interfaces/stock.interface';

@Injectable()
export class StocksService {
  private readonly logger = new Logger(StocksService.name);
  private stockData: StockData[] = [];
  private lastUpdate = 0;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getStocks(): Promise<StockData[]> {
    const cacheDuration = this.configService.get<number>('cache.stonkCacheDuration');
    const now = Date.now();

    if (now - this.lastUpdate > cacheDuration) {
      await this.updateStockData();
    }

    return this.stockData;
  }

  async getStockBySymbol(symbol: string): Promise<StockData | null> {
    const stocks = await this.getStocks();
    return stocks.find(stock => stock.symbol === symbol) || null;
  }

  private async updateStockData(): Promise<void> {
    try {
      const symbols = this.configService.get<string[]>('stockSymbols');
      const stockPromises = symbols.map(symbol => this.fetchStockData(symbol));
      const stocks = await Promise.all(stockPromises);
      
      this.stockData = stocks.filter(stock => stock !== null);
      this.lastUpdate = Date.now();
      
      this.logger.log('Stock data updated successfully');
    } catch (error) {
      this.logger.error('Error updating stock data:', error.message);
    }
  }

  private async fetchStockData(symbol: string): Promise<StockData | null> {
    const apiKey = this.configService.get<string>('api.alphaVantage.apiKey');

    console.log(apiKey);

    const baseUrl = this.configService.get<string>('api.alphaVantage.baseUrl');

  try {
      const response = await firstValueFrom(
        this.httpService.get<AlphaVantageResponse>(baseUrl, {
          params: {
            function: 'GLOBAL_QUOTE',
            symbol: symbol,
            apikey: apiKey,
          },
        }),
      );

      const quote = response.data['Global Quote'];
      if (quote && quote['01. symbol']) {
        return {
          symbol: quote['01. symbol'],
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
          volume: parseInt(quote['06. volume']),
          timestamp: Date.now(),
        };
      }
      return null;
    } catch (error) {
      this.logger.error(`Error fetching stock data for ${symbol}:`, error.message);
      return null;
    }
  }
}
