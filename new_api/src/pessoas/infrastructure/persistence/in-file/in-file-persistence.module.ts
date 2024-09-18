import { Module } from "@nestjs/common";
import { PessoaRepository } from "src/pessoas/application/ports/pessoas.repository";
import { InFilePessoaRepository } from "./repositories/pessoa.repository";

@Module({
  imports: [],
  providers: [
    {
      provide: PessoaRepository,
      useClass: InFilePessoaRepository,
    },
  ],
  exports: [PessoaRepository],
})
export class InFilePessoaPersistenceModule {}