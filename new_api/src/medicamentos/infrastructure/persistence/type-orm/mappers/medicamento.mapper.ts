import { Injectable } from '@nestjs/common';
import { Medicamento } from '../../../../domain/medicamentos';
import { MedicamentoEntity } from '../entities/medicamento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GastoEntity } from '../../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { VeterinarioEntity } from '../../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { AnimalEntity } from '../../../../../animais/infrastructure/persistence/type-orm/entities//animal.entity';
import { Repository } from 'typeorm';
import { Gasto } from '../../../../../gastos/domain/gastos';
import { Veterinario } from '../../../../../veterinarios/domain/veterinarios';
import { Animal } from '../../../../../animais/domain/animal';

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

  paraDominio(medicamentoEntity: MedicamentoEntity): Medicamento {

    const gasto = new Gasto(
        medicamentoEntity.gasto.id,
        medicamentoEntity.gasto.data_gasto,
        medicamentoEntity.gasto.tipo,
        medicamentoEntity.gasto.quantidade,
        medicamentoEntity.gasto.valor,
      );

      const veterinario = new Veterinario(
        medicamentoEntity.veterinario.id,
        medicamentoEntity.veterinario.especialidade,
        medicamentoEntity.veterinario.registro_crmv
      );

      const animal = new Animal(
        medicamentoEntity.animal.id,
        medicamentoEntity.animal.nome,
        medicamentoEntity.animal.especie,
        medicamentoEntity.animal.sexo,
        medicamentoEntity.animal.data_nascimento,
        medicamentoEntity.animal.condicao_saude,
        medicamentoEntity.animal.estado_adocao
      );

    return new Medicamento(
      medicamentoEntity.id,
      medicamentoEntity.animal_id,
      medicamentoEntity.data_compra,
      medicamentoEntity.descricao,
      medicamentoEntity.veterinario_id,
      medicamentoEntity.gasto_id
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
