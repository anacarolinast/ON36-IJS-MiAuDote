// import { DataSource, DataSourceOptions } from "typeorm";
// import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
// import 'dotenv/config';
// import { ConsumivelEntity } from '../../../../consumiveis/infrastructure/persistence/type-orm/entities/consumivel.entity';


// export const dataSourceOptions: DataSourceOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: +process.env.DB_PORT,
//   username: process.env.DB_USERNAME,
//   password: String(process.env.DB_PASSWORD),
//   database: process.env.DB_NAME,
//   logging: true,
//   migrations: [`${__dirname}/migrations/*.{ts,js}`],
//   entities: [ConsumivelEntity, GastoEntity]
// };

// export default new DataSource(dataSourceOptions);