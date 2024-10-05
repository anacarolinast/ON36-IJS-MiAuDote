import { Module } from "@nestjs/common";
import { VacinaRepository } from "src/vacinas/application/ports/vacinas.repository";
import { InMemoryVacinaRepository } from "./repositories/vacina.repository";
@Module({
  imports: [],
  providers: [
    {
      provide: VacinaRepository,
      useClass: InMemoryVacinaRepository,
    },
  ],
  exports: [VacinaRepository],
})
export class InMemoryVacinaPersistenceModule {}