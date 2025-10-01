import { Controller, Get, Post, HttpException, HttpStatus } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiResponseDto, WeatherDataDto } from '../common/dto/api-response.dto';

@Controller('api/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(): Promise<ApiResponseDto<WeatherDataDto>> {
    try {
      const weather = await this.weatherService.getWeather();
      return {
        success: true,
        data: weather,
        timestamp: Date.now(),
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: 'Failed to fetch weather data',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('refresh')
  async refreshWeather(): Promise<ApiResponseDto<WeatherDataDto>> {
    try {
      const weather = await this.weatherService.refreshWeather();
      return {
        success: true,
        message: 'Weather data refreshed successfully',
        data: weather,
        timestamp: Date.now(),
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: 'Failed to refresh weather data',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
