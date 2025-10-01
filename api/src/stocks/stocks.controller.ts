import { Controller, Get, Param, Post, HttpException, HttpStatus } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { ApiResponseDto, StockDataDto } from '../common/dto/api-response.dto';

@Controller('api/stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  async getAllStocks(): Promise<ApiResponseDto<StockDataDto[]>> {
    try {
      const stocks = await this.stocksService.getStocks();
      return {
        success: true,
        data: stocks,
        timestamp: Date.now(),
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: 'Failed to fetch stock data',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':symbol')
  async getStockBySymbol(@Param('symbol') symbol: string): Promise<ApiResponseDto<StockDataDto>> {
    try {
      const stock = await this.stocksService.getStockBySymbol(symbol.toUpperCase());
      
      if (!stock) {
        throw new HttpException(
          {
            success: false,
            error: `Stock symbol ${symbol.toUpperCase()} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        success: true,
        data: stock,
        timestamp: Date.now(),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          success: false,
          error: 'Failed to fetch stock data',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('refresh')
  async refreshStocks(): Promise<ApiResponseDto<StockDataDto[]>> {
    try {
      const stocks = await this.stocksService.refreshStocks();
      return {
        success: true,
        message: 'Stock data refreshed successfully',
        data: stocks,
        timestamp: Date.now(),
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: 'Failed to refresh stock data',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
