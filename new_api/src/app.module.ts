import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { VeterinariosModule } from './veterinarios/veterinarios.module';
import { DoadoresModule } from './doadores/doadores.module';
import { AdotantesModule } from './adotantes/application/adotantes.module';
import { ConsumiveisModule } from './consumiveis/consumiveis.module';
import { AdocoesModule } from './adocoes/application/adocoes.module';
import { CastracoesModule } from './castracoes/castracoes.module';
import { VacinasModule } from './vacinas/vacinas.module';
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { DoacoesModule } from './doacoes/doacoes.module';
import { GastosModule } from './gastos/gastos.module';
import { AnimaisModule } from './animais/animais.module';

@Module({
  imports: [PessoasModule, VeterinariosModule, DoadoresModule, ConsumiveisModule, AdotantesModule, AdocoesModule, CastracoesModule, VacinasModule, MedicamentosModule, DoacoesModule, GastosModule, AnimaisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
