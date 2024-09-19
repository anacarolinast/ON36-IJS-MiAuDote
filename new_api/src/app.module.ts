import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/application/pessoas.module'; 
import { VeterinariosModule } from './veterinarios/application/veterinarios.module';
import { DoadoresModule } from './doadores/application/doadores.module';
import { AdotantesModule } from './adotantes/application/adotantes.module';
import { ConsumiveisModule } from './consumiveis/application/consumiveis.module';
import { AdocoesModule } from './adocoes/application/adocoes.module';
import { CastracoesModule } from './castracoes/application/castracoes.module';
import { VacinasModule } from './vacinas/application/vacinas.module';
import { MedicamentosModule } from './medicamentos/application/medicamentos.module';
import { DoacoesModule } from './doacoes/application/doacoes.module';
import { GastosModule } from './gastos/application/gastos.module';
import { AnimaisModule } from './animais/application/animais.module'; 
import { PessoaRepository } from './pessoas/application/ports/pessoas.repository';
import { InFilePessoaRepository } from './pessoas/infrastructure/persistence/in-file/repositories/pessoa.repository';
import { InMemoryPessoaRepository } from './pessoas/infrastructure/persistence/in-memory/repositories/pessoa.repository';
import { VeterinarioRepository } from './veterinarios/application/ports/veterinarios.repository';
import { InFileVeterinarioRepository } from './veterinarios/infrastructure/persistence/in-file/repositories/veterinario.repository';
import { InMemoryVeterinarioRepository } from './veterinarios/infrastructure/persistence/in-memory/repositories/veterinario.repository';
import { DoadorRepository } from './doadores/application/ports/doador.repository';
import { InFileDoadorRepository } from './doadores/infrastructure/persistence/in-file/repositories/doador.repository';
import { InMemoryDoadorRepository } from './doadores/infrastructure/persistence/in-memory/repositories/doador.repository';
import { AdotanteRepository } from './adotantes/application/ports/adotantes.repository'; 
import { InFileAdotanteRepository } from './adotantes/infrastructure/persistence/in-file/repositories/adotante.repository';
import { InMemoryAdotanteRepository } from './adotantes/infrastructure/persistence/in-memory/repositories/adotante.repository';
import { ConsumivelRepository } from './consumiveis/application/ports/consumiveis.repository'; 
import { InFileConsumivelRepository } from './consumiveis/infrastructure/persistence/in-file/repositories/consumivel.repository';
import { InMemoryConsumivelRepository } from './consumiveis/infrastructure/persistence/in-memory/repositories/consumivel.repository';
import { AnimalRepository } from './animais/application/ports/animais.repository';
import { InFileAnimalRepository } from './animais/infrastructure/persistence/in-file/repositories/animais.repository';
import { InMemoryAnimalRepository } from './animais/infrastructure/persistence/in-memory/repositories/animais.repository';
import { VacinaRepository } from './vacinas/application/ports/vacinas.repository';
import { InFileVacinaRepository } from './vacinas/infrastructure/persistence/in-file/repositories/vacina.repository';
import { InMemoryVacinaRepository } from './vacinas/infrastructure/persistence/in-memory/repositories/vacina.repository';
import { GastoRepository } from './gastos/application/ports/gasto.repository';
import { InFileGastoRepository } from './gastos/infrastructure/persistence/in-file/repositories/gasto.repository';
import { InMemoryGastoRepository } from './gastos/infrastructure/persistence/in-memory/repositories/gasto.repository';
import { CastracaoRepository } from './castracoes/application/ports/castracoes.repository';
import { InFileCastracaoRepository } from './castracoes/infrastructure/persistence/in-file/repositories/castracao.repository';
import { InMemoryCastracaoRepository } from './castracoes/infrastructure/persistence/in-memory/repositories/castracao.repository';
import { AdocaoRepository } from './adocoes/application/ports/adocoes.repository';
import { InFileAdocaoRepository } from './adocoes/infrastructure/persistence/in-file/repositories/adocoes.repository';
import { InMemoryAdocaoRepository } from './adocoes/infrastructure/persistence/in-memory/repositories/adocoes.repository';
import { MedicamentoRepository } from './medicamentos/application/ports/medicamento.repository';
import { InMemoryMedicamentoRepository } from './medicamentos/infrastructure/persistence/in-memory/repositories/medicamento.repository';
import { InFileMedicamentoRepository } from './medicamentos/infrastructure/persistence/in-file/repositories/medicamento.repository';
import { DoacaoRepository } from './doacoes/application/ports/doacao.repository';
import { InFileDoacaoRepository } from './doacoes/infrastructure/persistence/in-file/repositories/doacao.repository';
import { InMemoryDoacaoRepository } from './doacoes/infrastructure/persistence/in-memory/repositories/doacao.repository';

@Module({})
export class AppModule {
  static register(options: { driver: 'in-file' | 'in-memory' }): DynamicModule {
    const { driver } = options;

    return {
      module: AppModule,
      imports: [
        PessoasModule,
        VeterinariosModule,
        DoadoresModule,
        ConsumiveisModule,
        AdotantesModule,
        AdocoesModule,
        CastracoesModule,
        VacinasModule,
        MedicamentosModule,
        DoacoesModule,
        GastosModule,
        AnimaisModule,
      ],
      providers: [
        {
          provide: PessoaRepository,
          useClass: driver === 'in-file' ? InFilePessoaRepository : InMemoryPessoaRepository,
        },
        {
          provide: VeterinarioRepository,
          useClass: driver === 'in-file' ? InFileVeterinarioRepository : InMemoryVeterinarioRepository,
        },
        {
          provide: DoadorRepository,
          useClass: driver === 'in-file' ? InFileDoadorRepository : InMemoryDoadorRepository,
        },
        {
          provide: AdotanteRepository,
          useClass: driver === 'in-file' ? InFileAdotanteRepository : InMemoryAdotanteRepository,
        },
        {
          provide: ConsumivelRepository,
          useClass: driver === 'in-file' ? InFileConsumivelRepository : InMemoryConsumivelRepository,
        },
        {
          provide: AnimalRepository,
          useClass: driver === 'in-file' ? InFileAnimalRepository : InMemoryAnimalRepository,
        },
        {
          provide: VacinaRepository,
          useClass: driver === 'in-file' ? InFileVacinaRepository : InMemoryVacinaRepository,
        },
        {
          provide: GastoRepository,
          useClass: driver === 'in-file' ? InFileGastoRepository : InMemoryGastoRepository,
        },
        {
          provide: CastracaoRepository,
          useClass: driver === 'in-file' ? InFileCastracaoRepository : InMemoryCastracaoRepository,
        },
        {
          provide: AdocaoRepository,
          useClass: driver === 'in-file' ? InFileAdocaoRepository : InMemoryAdocaoRepository,
        },
        {
          provide: MedicamentoRepository,
          useClass: driver === 'in-file' ? InFileMedicamentoRepository : InMemoryMedicamentoRepository,
        },
        {
          provide: DoacaoRepository,
          useClass: driver === 'in-file' ? InFileDoacaoRepository : InMemoryDoacaoRepository,
        },
      ],
    };
  }
}
