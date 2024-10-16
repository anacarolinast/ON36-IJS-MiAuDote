import { Medicamento } from "src/medicamentos/domain/medicamentos";
import { MedicamentoEntity } from "../entities/medicamento.entity";
import { GastoMapper } from "src/gastos/infrastructure/persistence/in-file/mappers/gasto.mapper"; 

export class MedicamentoMapper {
    static paraDominio(medicamentoEntity: MedicamentoEntity): Medicamento {
        const { 
            id, 
            animal_id, 
            data_compra, 
            descricao, 
            veterinario_id, 
            gasto_id,
        } = medicamentoEntity;

        return new Medicamento(
            id,
            animal_id,
            data_compra,
            descricao,
            veterinario_id,
            gasto_id,
        );
    }

    static paraPersistencia(medicamento: Medicamento): MedicamentoEntity {
        const entity = new MedicamentoEntity();
        
        entity.id = medicamento.id;
        entity.animal_id = medicamento.animal_id;
        entity.data_compra = medicamento.data_compra;
        entity.descricao = medicamento.descricao;
        entity.veterinario_id = medicamento.veterinario_id;    


        entity.gastos = GastoMapper.paraPersistencia(medicamento); 

        return entity;
    }
}
