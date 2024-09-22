import { Veterinario } from "src/veterinarios/domain/veterinarios";
import { VeterinarioEntity } from "../entities/veterinario.entity";
import { PessoaMapper } from "src/pessoas/infrastructure/persistence/in-file/mappers/pessoa.mapper";

export class VeterinarioMapper {
    static paraDominio(veterinarioEntity: VeterinarioEntity): Veterinario {
        return new Veterinario(
            veterinarioEntity.id,
            veterinarioEntity.especialidade,
            veterinarioEntity.registro_crmv,
            veterinarioEntity.pessoa_id,
            PessoaMapper.paraDominio(veterinarioEntity.pessoa),
        )
    }

    static paraPersistencia(veterinario: Veterinario): VeterinarioEntity {
        const entity = new VeterinarioEntity();
        entity.id = veterinario.id;
        entity.especialidade = veterinario.especialidade;
        entity.registro_crmv = veterinario.registro_crmv;
        entity.pessoa_id = veterinario.pessoa_id;
        entity.pessoa = PessoaMapper.paraPersistencia(veterinario.pessoa);
        // entity.vacinas = veterinario.vacinas;
        // entity.medicamentos = veterinario.medicamentos;
        // entity.castracoes = veterinario.castracoes;
        return entity;
    }
}