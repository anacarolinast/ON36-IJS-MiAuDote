import { Vacina } from "src/vacinas/domain/vacinas";
import { VacinaEntity } from "../entities/vacina.entity";
import { GastoMapper } from "src/gastos/infrastructure/persistence/in-file/mappers/gasto.mapper"; 

export class VacinaMapper {
    static paraDominio(vacinaEntity: VacinaEntity): Vacina {
        const { 
            id, 
            animal_id, 
            data_vacinacao, 
            tipo_vacina, 
            veterinario_id, 
            gasto_id 
        } = vacinaEntity;

        return new Vacina(
            id,
            animal_id,
            data_vacinacao,
            tipo_vacina,
            veterinario_id,
            gasto_id,
        );
    }

    static paraPersistencia(vacina: Vacina): VacinaEntity {
        const entity = new VacinaEntity();
        entity.id = vacina.id;
        entity.animal_id = vacina.animal_id;
        entity.data_vacinacao = vacina.data_vacinacao;
        entity.tipo_vacina = vacina.tipo_vacina;
        entity.veterinario_id = vacina.veterinario_id;
        entity.gastos = GastoMapper.paraPersistencia(vacina);  
        
        return entity;
    }
}
