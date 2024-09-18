import { Module } from "@nestjs/common";
import { VacinaRepository } from "src/vacinas/application/ports/vacinas.repository";
import { InFileVacinaRepository } from "./repositories/vacina.repository";
@Module({
  imports: [],
  providers: [
    {
      provide: VacinaRepository,
      useClass: InFileVacinaRepository,
    },
  ],
  exports: [VacinaRepository],
})
export class InFileVacinaPersistenceModule {}