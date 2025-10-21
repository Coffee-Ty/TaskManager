import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiResponseDto, WeatherDataDto } from '../common/dto/api-response.dto';

@Controller('api/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(): Promise<ApiResponseDto<WeatherDataDto>> {
    const weather = await this.weatherService.getWeather();
    return {
      success: true,
      data: weather,
      timestamp: Date.now(),
    };
  }
}
