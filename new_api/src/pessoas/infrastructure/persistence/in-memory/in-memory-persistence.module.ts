import { Module } from "@nestjs/common";
import { PessoaRepository } from "src/pessoas/application/ports/pessoas.repository";
import { InMemoryPessoaRepository } from "./repositories/pessoa.repository";

@Module({
  imports: [],
  providers: [
    {
      provide: PessoaRepository,
      useClass: InMemoryPessoaRepository,
    },
  ],
  exports: [PessoaRepository],
})
export class InMemoryPessoaPersistenceModule {}