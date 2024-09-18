import { Vacina } from "src/vacinas/domain/vacinas";
import { VacinaEntity } from "../entities/vacina.entity";

export class VacinaMapper {
    static paraDominio(vacinaEntity: VacinaEntity): Vacina {
        const model = new Vacina(
            vacinaEntity.id,
            vacinaEntity.animal_id,
            vacinaEntity.data_vacinacao,
            vacinaEntity.tipo_vacina,
            vacinaEntity.veterinario_id,
            vacinaEntity.gasto_id,
            // vacinaEntity.animal,
            // vacinaEntity.veterinario,
            // vacinaEntity.gasto
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
        // entity.animal = vacina.animal;
        // entity.veterinario = vacina.veterinario;
        // entity.gasto = vacina.gasto;
        return entity;
    }
}