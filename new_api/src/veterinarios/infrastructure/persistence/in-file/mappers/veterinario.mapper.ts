import { Veterinario } from "src/veterinarios/domain/veterinarios";
import { VeterinarioEntity } from "../entities/veterinario.entity";
import { PessoaMapper } from "src/pessoas/infrastructure/persistence/in-file/mappers/pessoa.mapper";
import { VacinaMapper } from "src/vacinas/infrastructure/persistence/in-file/mappers/vacina.mapper";
import { MedicamentoMapper } from "src/medicamentos/infrastructure/persistence/in-file/mappers/medicamento.mapper";
import { CastracaoMapper } from "src/castracoes/infrastructure/persistence/in-file/mappers/castracao.mappers"; 

export class VeterinarioMapper {
    static paraDominio(veterinarioEntity: VeterinarioEntity): Veterinario {
        return new Veterinario(
            veterinarioEntity.id,
            veterinarioEntity.especialidade,
            veterinarioEntity.registro_crmv,
            veterinarioEntity.pessoa_id,
            PessoaMapper.paraDominio(veterinarioEntity.pessoa),
            veterinarioEntity.vacina?.map(veterinarioEntity => VacinaMapper.paraDominio(veterinarioEntity)) || [],
            veterinarioEntity.medicamento?.map(veterinarioEntity => MedicamentoMapper.paraDominio(veterinarioEntity)) || [],
            veterinarioEntity.castracao?.map(veterinarioEntity => CastracaoMapper.paraDominio(veterinarioEntity)) || [],
        );
    }

    static paraPersistencia(veterinario: Veterinario): VeterinarioEntity {
        const entity = new VeterinarioEntity();
        entity.id = veterinario.id;
        entity.especialidade = veterinario.especialidade;
        entity.registro_crmv = veterinario.registro_crmv;
        entity.pessoa_id = veterinario.pessoa_id;
        entity.pessoa = PessoaMapper.paraPersistencia(veterinario.pessoa);
        entity.vacina = veterinario.vacinas?.map(vacinas => VacinaMapper.paraPersistencia(vacinas)) || []
        entity.medicamento = veterinario.medicamentos?.map(medicamento => MedicamentoMapper.paraPersistencia(medicamento)) || [];
        entity.castracao = veterinario.castracoes?.map(castracao => CastracaoMapper.paraPersistencia(castracao)) || [];
        return entity;
    }
}
