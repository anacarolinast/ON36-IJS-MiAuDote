import { DataSource, DataSourceOptions } from "typeorm";
import { AdocaoEntity } from "./entities/adocao.entity";
import 'dotenv/config';
import { AdotanteEntity } from '../../../../adotantes/infrastructure/persistence/type-orm/entities/adotante.entity';
import { AnimalEntity } from "../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity";


export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  logging: true,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  entities: [AdocaoEntity, AdotanteEntity, AnimalEntity]
};

export default new DataSource(dataSourceOptions);