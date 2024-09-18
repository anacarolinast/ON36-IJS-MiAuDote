import { Module } from "@nestjs/common";
import { VeterinarioRepository } from "src/veterinarios/application/ports/veterinarios.repository";
import { InMemoryVeterinarioRepository } from "./repositories/veterinario.repository";

@Module({
  imports: [],
  providers: [
    {
      provide: VeterinarioRepository,
      useClass: InMemoryVeterinarioRepository,
    },
  ],
  exports: [VeterinarioRepository],
})
export class InMemoryVeterinarioPersistenceModule {}