import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StocksModule } from './stocks/stocks.module';
import { WeatherModule } from './weather/weather.module';
import { HealthModule } from './health/health.module';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.register({
      ttl: 300, // 5 minutes default TTL
      max: 100, // maximum number of items in cache
    }),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    StocksModule,
    WeatherModule,
    HealthModule,
  ],
})
export class AppModule {}
