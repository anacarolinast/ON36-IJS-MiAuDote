import { Medicamento } from "src/medicamentos/domain/medicamentos";
import { MedicamentoEntity } from "../entities/medicamento.entity";


export class MedicamentoMapper {
  static paraDominio(medicamentoEntity: MedicamentoEntity): Medicamento {
    const model = new Medicamento(
      medicamentoEntity.id,
      medicamentoEntity.animal_id,
      medicamentoEntity.data_compra,
      medicamentoEntity.descricao,
      medicamentoEntity.veterinario_id,
      medicamentoEntity.gasto_id,
      // medicamentoEntity.animal
      // medicamentoEntity.veterinario
      // medicamentoEntity.gasto
    );
    return model;
  }

  static paraPersistencia(medicamento: Medicamento): MedicamentoEntity {
    const entity = new MedicamentoEntity();
    entity.id = medicamento.id;
    entity.animal_id = medicamento.animal_id;
    entity.data_compra = medicamento.data_compra;
    entity.descricao = medicamento.descricao;
    entity.veterinario_id = medicamento.veterinario_id;
    entity.gasto_id = medicamento.gasto_id;
    // entity.animal = medicamento.animal;
    // entity.veterinario = medicamento.veterinario;
    // entity.gasto = medicamento.gasto;
    return entity;
  }
}
