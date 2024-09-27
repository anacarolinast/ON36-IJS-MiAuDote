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
      AnimalMapper.paraDominio(medicamentoEntity.animais),
      VeterinarioMapper.paraDominio(medicamentoEntity.veterinarios),
      GastoMapper.paraDominio(medicamentoEntity.gastos),
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
    entity.animais = AnimalMapper.paraPersistencia(medicamento.animal);
    entity.veterinarios = VeterinarioMapper.paraPersistencia(medicamento.veterinario);
    entity.gastos = GastoMapper.paraPersistencia(medicamento.gasto);
    return entity;
  }
}
