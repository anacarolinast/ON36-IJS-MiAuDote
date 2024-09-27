import { Vacina } from "src/vacinas/domain/vacinas";
import { VacinaEntity } from "../entities/vacina.entity";
import { AnimalMapper } from "src/animais/infrastructure/persistence/in-file/mappers/animais.mapper"; 
import { VeterinarioMapper } from "src/veterinarios/infrastructure/persistence/in-file/mappers/veterinario.mapper";
import { GastoMapper } from "src/gastos/infrastructure/persistence/in-file/mappers/gasto.mapper"; 

export class VacinaMapper {
    static paraDominio(vacinaEntity: VacinaEntity): Vacina {
        const model = new Vacina(
            vacinaEntity.id,
            vacinaEntity.animal_id,
            vacinaEntity.data_vacinacao,
            vacinaEntity.tipo_vacina,
            vacinaEntity.veterinario_id,
            vacinaEntity.gasto_id,
            vacinaEntity.animais ? AnimalMapper.paraDominio(vacinaEntity.animais) : undefined,
            vacinaEntity.veterinarios ? VeterinarioMapper.paraDominio(vacinaEntity.veterinarios) : undefined,
            vacinaEntity.gastos ? GastoMapper.paraDominio(vacinaEntity.gastos) : undefined,
        );
        return model;
    }

    static paraPersistencia(vacina: Vacina): VacinaEntity {
        const entity = new VacinaEntity();
        entity.id = vacina.id;
        entity.animal_id = vacina.animal_id;
        entity.data_vacinacao = vacina.data_vacinacao;
        entity.tipo_vacina = vacina.tipo_vacina;
        entity.veterinario_id = vacina.veterinario_id;
        entity.gasto_id = vacina.gasto_id;
        if (vacina.animal) {
            entity.animais = AnimalMapper.paraPersistencia(vacina.animal);
        }
        if (vacina.veterinario) {
            entity.veterinarios = VeterinarioMapper.paraPersistencia(vacina.veterinario);
        }
        if (vacina.gasto) {
            entity.gastos = GastoMapper.paraPersistencia(vacina.gasto);
        }
        return entity;
    }
}