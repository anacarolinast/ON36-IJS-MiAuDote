import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { VeterinariosModule } from './veterinarios/veterinarios.module';

@Module({
  imports: [PessoasModule, VeterinariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
