import { DataSource, DataSourceOptions } from "typeorm";
import { DoacaoEntity } from '../../../../doacoes/infrastructure/persistence/type-orm/entities/doacao.entity';
import 'dotenv/config';
import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { VeterinarioEntity } from '../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { AnimalEntity } from '../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  logging: true,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  entities: [GastoEntity, AnimalEntity, VeterinarioEntity, DoacaoEntity]
};

export default new DataSource(dataSourceOptions);