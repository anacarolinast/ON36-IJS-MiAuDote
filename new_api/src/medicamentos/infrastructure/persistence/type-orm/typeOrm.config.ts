import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';
import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { VeterinarioEntity } from "src/veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity"; 
import { AnimalEntity } from "src/animais/infrastructure/persistence/type-orm/entities/animal.entity"; 
import { MedicamentoEntity } from "src/medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity"; 

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  logging: true,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  entities: [GastoEntity, AnimalEntity, VeterinarioEntity, MedicamentoEntity]
};

export default new DataSource(dataSourceOptions);