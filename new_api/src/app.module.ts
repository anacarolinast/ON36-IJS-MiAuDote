import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './adocoes/core/core.module';
import { ApplicationBootstrapOptions } from './adocoes/common/interfaces/application-bootstrap-options.interface';
import { AdocoesModule } from './adocoes/application/adocoes.module';
import { AdocaoInfrastructureModule } from './adocoes/infrastructure/adocoes-infrastructure.module'; 
import { AdotantesModule } from './adotantes/application/adotantes.module';
import { AdotanteInfrastructureModule } from './adotantes/infrastructure/adotantes-infrastrucutre.module'; 
import { AnimaisModule } from './animais/application/animais.module';
import { AnimalInfrastructureModule } from './animais/infrastructure/animais-infrastructure.module';
import { CastracoesModule } from './castracoes/application/castracoes.module';
import { CastracaoInfrastructureModule } from './castracoes/infrastructure/castracoes-infrastructure.module';
import { ConsumiveisModule } from './consumiveis/application/consumiveis.module';
import { ConsumivelInfrastructureModule } from './consumiveis/infrastructure/consumiveis-infrastructure.module';
import { DoacoesModule } from './doacoes/application/doacoes.module';
import { DoacaoInfrastructureModule } from './doacoes/infrastructure/doacoes-infrastructure.module';
import { DoadoresModule } from './doadores/application/doadores.module';
import { DoadorInfrastructureModule } from './doadores/infrastructure/doadores-infrastructure.module';
import { GastosModule } from './gastos/application/gastos.module';
import { GastoInfrastructureModule } from './gastos/infrastructure/gastos-infrastructure.module';
import { MedicamentosModule } from './medicamentos/application/medicamentos.module';
import { MedicamentoInfrastructureModule } from './medicamentos/infrastructure/medicamentos-infrastructure.module';
import { PessoasModule } from './pessoas/application/pessoas.module';
import { PessoaInfrastructureModule } from './pessoas/infrastructure/pessoas-infrastructure.module';
import { VacinasModule } from './vacinas/application/vacinas.module';
import { VacinaInfrastructureModule } from './vacinas/infrastructure/vacinas-infrastructure.module';
import { VeterinariosModule } from './veterinarios/application/veterinarios.module';
import { VeterinarioInfrastructureModule } from './veterinarios/infrastructure/veterinarios-infrastructure.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Importando o ConfigModule
import { dataSourceOptions } from './database/typeOrm.config'; // Ajuste o caminho conforme necessário

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Especificando o caminho do arquivo .env
      isGlobal: true, // Fazendo as variáveis de ambiente globais
    }),
    CoreModule,
    TypeOrmModule.forRoot(dataSourceOptions), // Adicionando a configuração do TypeORM aqui
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }), // Incluindo o ConfigModule aqui também, se necessário
        CoreModule.forRoot(options),
        TypeOrmModule.forRoot(dataSourceOptions),
        AdocoesModule,
        AdocaoInfrastructureModule.use(options.driver),
        AdotantesModule,
        AdotanteInfrastructureModule.use(options.driver),
        AnimaisModule,
        AnimalInfrastructureModule.use(options.driver),
        CastracoesModule,
        CastracaoInfrastructureModule.use(options.driver),
        ConsumiveisModule,
        ConsumivelInfrastructureModule.use(options.driver),
        DoacoesModule,
        DoacaoInfrastructureModule.use(options.driver),
        DoadoresModule,
        DoadorInfrastructureModule.use(options.driver),
        GastosModule,
        GastoInfrastructureModule.use(options.driver),
        MedicamentosModule,
        MedicamentoInfrastructureModule.use(options.driver),
        PessoasModule,
        PessoaInfrastructureModule.use(options.driver),
        VacinasModule,
        VacinaInfrastructureModule.use(options.driver),
        VeterinariosModule,
        VeterinarioInfrastructureModule.use(options.driver),
      ],
    };
  }
}
