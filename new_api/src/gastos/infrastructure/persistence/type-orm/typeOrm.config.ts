import { DataSource, DataSourceOptions } from "typeorm";
import { DoacaoEntity } from '../../../../doacoes/infrastructure/persistence/type-orm/entities/doacao.entity';
import 'dotenv/config';
import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { CastracaoEntity } from '../../../../castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { VacinaEntity } from '../../../../vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { MedicamentoEntity } from '../../../../medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { ConsumivelEntity } from '../../../../consumiveis/infrastructure/persistence/type-orm/entities/consumivel.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  logging: true,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  entities: [GastoEntity, CastracaoEntity, ConsumivelEntity, VacinaEntity, MedicamentoEntity, DoacaoEntity]
};

export default new DataSource(dataSourceOptions);