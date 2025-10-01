import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WeatherData } from '../common/interfaces/weather.interface';
import { OpenWeatherResponse } from '../common/interfaces/weather.interface';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private weatherData: WeatherData | null = null;
  private lastUpdate = 0;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWeather(): Promise<WeatherData | null> {
    const cacheDuration = this.configService.get<number>('cache.weatherCacheDuration');
    const now = Date.now();

    if (now - this.lastUpdate > cacheDuration) {
      await this.updateWeatherData();
    }

    return this.weatherData;
  }

  async refreshWeather(): Promise<WeatherData | null> {
    await this.updateWeatherData();
    return this.weatherData;
  }

  private async updateWeatherData(): Promise<void> {
    try {
      this.weatherData = await this.fetchWeatherData();
      this.lastUpdate = Date.now();
      this.logger.log('Weather data updated successfully');
    } catch (error) {
      this.logger.error('Error updating weather data:', error.message);
    }
  }

  private async fetchWeatherData(): Promise<WeatherData> {
    try {
      const apiKey = this.configService.get<string>('api.openWeather.apiKey');
      const baseUrl = this.configService.get<string>('api.openWeather.baseUrl');
      const coordinates = this.configService.get<{ lat: number; lon: number }>('coordinates.milwaukee');

      if (!apiKey) {
        throw new Error('OpenWeather API key not configured');
      }

      const response = await firstValueFrom(
        this.httpService.get<OpenWeatherResponse>(baseUrl, {
          params: {
            lat: coordinates.lat,
            lon: coordinates.lon,
            appid: apiKey,
            units: 'imperial',
          },
        }),
      );

      return {
        temperature: Math.round(response.data.main.temp),
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: Math.round(response.data.wind.speed),
        city: response.data.name,
        icon: response.data.weather[0].icon,
        timestamp: Date.now(),
      };
    } catch (error) {
      this.logger.error('Error fetching weather data:', error.message);
      return this.getFallbackWeatherData();
    }
  }

  private getFallbackWeatherData(): WeatherData {
    return {
      temperature: 45,
      description: 'Partly cloudy',
      humidity: 65,
      windSpeed: 8,
      city: 'Milwaukee',
      icon: '02d',
      timestamp: Date.now(),
    };
  }
}
