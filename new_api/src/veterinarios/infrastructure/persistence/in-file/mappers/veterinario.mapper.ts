import { Veterinario } from "src/veterinarios/domain/veterinarios";
import { VeterinarioEntity } from "../entities/veterinario.entity";

export class VeterinarioMapper {
    static paraDominio(veterinarioEntity: VeterinarioEntity): Veterinario {
        const model = new Veterinario(
            veterinarioEntity.id,
            veterinarioEntity.especialidade,
            veterinarioEntity.registro_crmv,
            veterinarioEntity.pessoa_id,
            // veterinarioEntity.pessoa,
            // veterinarioEntity.vacinas,
            // veterinarioEntity.medicamentos,
            // veterinarioEntity.castracoes
        );
        return model;
    }

    static paraPersistencia(veterinario: Veterinario): VeterinarioEntity {
        const entity = new VeterinarioEntity();
        entity.id = veterinario.id;
        entity.especialidade = veterinario.especialidade;
        entity.registro_crmv = veterinario.registro_crmv;
        entity.pessoa_id = veterinario.pessoa_id;
        // entity.pessoa = veterinario.pessoa;
        // entity.vacinas = veterinario.vacinas;
        // entity.medicamentos = veterinario.medicamentos;
        // entity.castracoes = veterinario.castracoes;
        return entity;
    }
}