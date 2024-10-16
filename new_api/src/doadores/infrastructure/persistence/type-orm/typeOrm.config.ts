// import { DataSource, DataSourceOptions } from "typeorm";
// import { DoacaoEntity } from '../../../../doacoes/infrastructure/persistence/type-orm/entities/doacao.entity';
// import 'dotenv/config';
// import { DoadorEntity } from '../../../../doadores/infrastructure/persistence/type-orm/entities/doador.entity';
// import { PessoaEntity } from '../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';


// export const dataSourceOptions: DataSourceOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: +process.env.DB_PORT,
//   username: process.env.DB_USERNAME,
//   password: String(process.env.DB_PASSWORD),
//   database: process.env.DB_NAME,
//   logging: true,
//   migrations: [`${__dirname}/migrations/*.{ts,js}`],
//   entities: [DoadorEntity, PessoaEntity, DoacaoEntity]
// };

// export default new DataSource(dataSourceOptions);