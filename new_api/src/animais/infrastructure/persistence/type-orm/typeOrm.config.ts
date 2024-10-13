import { DataSource, DataSourceOptions } from "typeorm";
import { CastracaoEntity } from '../../../../castracoes/infrastructure/persistence/in-file/entities/castracao.entity';
import { VacinaEntity } from '../../../../vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { MedicamentoEntity } from '../../../../medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { AdocaoEntity } from '../../../../adocoes/infrastructure/persistence/type-orm/entities/adocao.entity';
import 'dotenv/config';
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
  entities: [AdocaoEntity, AnimalEntity,MedicamentoEntity, VacinaEntity, CastracaoEntity]
};

export default new DataSource(dataSourceOptions);