import { Module } from "@nestjs/common";
import { VeterinarioRepository } from "src/veterinarios/application/ports/veterinarios.repository";
import { InFileVeterinarioRepository } from "./repositories/veterinario.repository";

@Module({
  imports: [],
  providers: [
    {
      provide: VeterinarioRepository,
      useClass: InFileVeterinarioRepository,
    },
  ],
  exports: [VeterinarioRepository],
})
export class InFileVeterinarioPersistenceModule {}