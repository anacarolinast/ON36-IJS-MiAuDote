import { Injectable } from '@nestjs/common';
import { Medicamento } from '../../../../domain/medicamentos';
import { MedicamentoEntity } from '../entities/medicamento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GastoEntity } from '../../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { VeterinarioEntity } from '../../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { AnimalEntity } from '../../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicamentoMapper {
  constructor(
    @InjectRepository(GastoEntity)
    private readonly gastoRepository: Repository<GastoEntity>,
    @InjectRepository(VeterinarioEntity)
    private readonly veterinarioRepository: Repository<VeterinarioEntity>,
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>,
  ) {}

  static paraDominio(medicamentoEntity: MedicamentoEntity): Medicamento {
    // Apenas utilize os IDs sem criar instâncias das entidades
    return new Medicamento(
      medicamentoEntity.id,
      medicamentoEntity.animal_id,
      medicamentoEntity.data_compra,
      medicamentoEntity.descricao,
      medicamentoEntity.veterinario_id,
      medicamentoEntity.gasto_id, // Adicione isso se necessário
    );
  }

  async paraPersistencia(medicamento: Medicamento): Promise<MedicamentoEntity> {
    const entity = new MedicamentoEntity();
    entity.animal_id = medicamento.animal_id;
    entity.data_compra = medicamento.data_compra;
    entity.descricao = medicamento.descricao;
    entity.veterinario_id = medicamento.veterinario_id;

    return entity;
  }
}
