import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "Rota inicial que retorna uma mensagem de boas-vindas à aplicação."})
  @ApiResponse({ status: 200, description: 'Mensagem de boas-vindas à API'})
  getHello(): string {
    return "Bem-vindo ao MiAuDote API!";
  }

  @Get('health')
  @ApiOperation({ summary: "Rota de health check para monitorar a disponibilidade e o funcionamento da API."})
  @ApiResponse({ status: 200, description: 'Mensagem com status de disponibilidade da API'})
  getHealthCheck(): { status: string } {
    return this.appService.getHealthCheck();
  }
}
