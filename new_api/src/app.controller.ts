import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "Bem-vindo ao MiAuDote API!";
  }

  @Get('health')
  getHealthCheck(): { status: string } {
    return this.appService.getHealthCheck();
  }
}
