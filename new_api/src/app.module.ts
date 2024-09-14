import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { VeterinariosModule } from './veterinarios/veterinarios.module';
import { DoadoresModule } from './doadores/doadores.module';
import { AdotanteModule } from './adotante/adotante.module';
import { ConsumiveisModule } from './consumiveis/consumiveis.module';
import { AdotantesModule } from './adotantes/adotantes.module';
import { AdocoesModule } from './adocoes/adocoes.module';
import { CastracoesModule } from './castracoes/castracoes.module';

@Module({
  imports: [PessoasModule, VeterinariosModule, DoadoresModule, AdotanteModule, ConsumiveisModule, AdotantesModule, AdocoesModule, CastracoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
