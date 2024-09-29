import { Veterinario } from "src/veterinarios/domain/veterinarios";
import { VeterinarioEntity } from "../entities/veterinario.entity";
import { VacinaMapper } from "src/vacinas/infrastructure/persistence/in-memory/mappers/vacina.mapper";
import { MedicamentoMapper } from "src/medicamentos/infrastructure/persistence/in-memory/mappers/medicamento.mapper";
import { CastracaoMapper } from "src/castracoes/infrastructure/persistence/in-memory/mappers/castracao.mappers";
import { PessoaMapper } from "src/pessoas/infrastructure/persistence/in-memory/mappers/pessoa.mapper";

export class VeterinarioMapper {
    static paraDominio(veterinarioEntity: VeterinarioEntity): Veterinario {
        const {id, especialidade, registro_crmv, pessoa_id, pessoa, vacina, medicamento, castracao} = veterinarioEntity;

        return new Veterinario(
            id,
            especialidade,
            registro_crmv,
            vacina?.map(VacinaMapper.paraDominio) || [],
            medicamento?.map(MedicamentoMapper.paraDominio) || [],
            castracao?.map(CastracaoMapper.paraDominio) || [],
            pessoa_id,
            pessoa.nome,
            pessoa.cep,
            pessoa.endereco,
            pessoa.telefone,
            pessoa.email,
            pessoa.cpf
        );
    }

    static paraPersistencia(veterinario: Veterinario): VeterinarioEntity {
        const entity = new VeterinarioEntity();
        entity.id = veterinario.id;
        entity.especialidade = veterinario.especialidade;
        entity.registro_crmv = veterinario.registro_crmv;
        entity.pessoa = PessoaMapper.paraPersistencia(veterinario);
        entity.vacina = veterinario.vacinas?.map(vacinas => VacinaMapper.paraPersistencia(vacinas)) || []
        entity.medicamento = veterinario.medicamentos?.map(medicamento => MedicamentoMapper.paraPersistencia(medicamento)) || [];
        entity.castracao = veterinario.castracoes?.map(castracao => CastracaoMapper.paraPersistencia(castracao)) || [];
        return entity;
    }
}
