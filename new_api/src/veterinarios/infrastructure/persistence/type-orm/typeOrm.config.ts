import { DataSource, DataSourceOptions } from "typeorm";
import { VeterinarioEntity } from '../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import 'dotenv/config';
import { PessoaEntity } from '../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { VacinaEntity } from '../../../../vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { CastracaoEntity } from '../../../../castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { MedicamentoEntity } from '../../../../medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  logging: true,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  entities: [PessoaEntity, VacinaEntity, CastracaoEntity, MedicamentoEntity, VeterinarioEntity, VeterinarioEntity]
};

export default new DataSource(dataSourceOptions);