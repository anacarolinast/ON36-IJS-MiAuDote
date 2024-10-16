// import { DataSource, DataSourceOptions } from "typeorm";
// import { AnimalEntity } from '../../../../animais/infrastructure/persistence/in-file/entities/animais.entity'; 
// import { VeterinarioEntity } from '../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
// import { GastoEntity } from '../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
// import 'dotenv/config';
// import { CastracaoEntity } from '../../../../castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';


// export const dataSourceOptions: DataSourceOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: +process.env.DB_PORT,
//   username: process.env.DB_USERNAME,
//   password: String(process.env.DB_PASSWORD),
//   database: process.env.DB_NAME,
//   logging: true,
//   migrations: [`${__dirname}/migrations/*.{ts,js}`],
//   entities: [AnimalEntity, CastracaoEntity, GastoEntity, VeterinarioEntity]
// };

// export default new DataSource(dataSourceOptions);