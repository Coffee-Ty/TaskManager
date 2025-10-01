import { Controller, Get } from '@nestjs/common';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@Controller('api/health')
export class HealthController {
  @Get()
  getHealth(): ApiResponseDto<{ uptime: number }> {
    return {
      success: true,
      message: 'Server is running',
      data: {
        uptime: process.uptime(),
      },
      timestamp: Date.now(),
    };
  }
}
