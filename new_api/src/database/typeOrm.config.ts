import { DataSource, DataSourceOptions } from 'typeorm';
import { AdocaoEntity } from '../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity';
import { AdotanteEntity } from '../adotantes/infrastructure/persistence/type-orm/entities/adotante.entity';
import { AnimalEntity } from '../animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { CastracaoEntity } from '../castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { ConsumivelEntity } from '../consumiveis/infrastructure/persistence/type-orm/entities/consumivel.entity';
import { DoacaoEntity } from '../doacoes/infrastructure/persistence/type-orm/entities/doacao.entity';
import { DoadorEntity } from '../doadores/infrastructure/persistence/type-orm/entities/doador.entity';
import { GastoEntity } from '../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { MedicamentoEntity } from '../medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { PessoaEntity } from '../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { VacinaEntity } from '../vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { VeterinarioEntity } from '../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  logging: true,
  synchronize: false, 
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  entities: [
    AdocaoEntity,
    AdotanteEntity,
    AnimalEntity,
    CastracaoEntity,
    ConsumivelEntity,
    DoacaoEntity,
    DoadorEntity,
    GastoEntity,
    MedicamentoEntity,
    PessoaEntity,
    VacinaEntity,
    VeterinarioEntity,
  ],
};

export default new DataSource(dataSourceOptions);
