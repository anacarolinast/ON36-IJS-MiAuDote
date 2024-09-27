import { Medicamento } from "src/medicamentos/domain/medicamentos";
import { MedicamentoEntity } from "../entities/medicamento.entity";
import { AnimalMapper } from "src/animais/infrastructure/persistence/in-file/mappers/animais.mapper"; 
import { VeterinarioMapper } from "src/veterinarios/infrastructure/persistence/in-file/mappers/veterinario.mapper";
import { GastoMapper } from "src/gastos/infrastructure/persistence/in-file/mappers/gasto.mapper"; 

export class MedicamentoMapper {
  static paraDominio(medicamentoEntity: MedicamentoEntity): Medicamento {
    const model = new Medicamento(
      medicamentoEntity.id,
      medicamentoEntity.animal_id,
      medicamentoEntity.data_compra,
      medicamentoEntity.descricao,
      medicamentoEntity.veterinario_id,
      medicamentoEntity.gasto_id,
      medicamentoEntity.animais ? AnimalMapper.paraDominio(medicamentoEntity.animais) : undefined,
      medicamentoEntity.veterinarios ? VeterinarioMapper.paraDominio(medicamentoEntity.veterinarios) : undefined,
      medicamentoEntity.gastos ? GastoMapper.paraDominio(medicamentoEntity.gastos) : undefined,
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
    if (medicamento.animal) {
      entity.animais = AnimalMapper.paraPersistencia(medicamento.animal);
  }
    if (medicamento.veterinario) {
      entity.veterinarios = VeterinarioMapper.paraPersistencia(medicamento.veterinario);
  }
  if (medicamento.gasto) {
    entity.gastos = GastoMapper.paraPersistencia(medicamento.gasto);
}
    return entity;
  }
}
