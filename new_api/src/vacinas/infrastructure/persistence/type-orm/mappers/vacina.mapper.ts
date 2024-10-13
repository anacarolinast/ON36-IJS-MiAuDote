import { Injectable } from '@nestjs/common';
import { Vacina } from '../../../../domain/vacinas';
import { VacinaEntity } from '../entities/vacina.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalEntity } from '../../../../../animais/infrastructure/persistence/type-orm/entities/animal.entity';
import { VeterinarioEntity } from '../../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { GastoEntity } from '../../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { Repository } from 'typeorm';
import { Animal } from '../../../../../animais/domain/animal';
import { Veterinario } from '../../../../../veterinarios/domain/veterinarios';
import { Gasto } from '../../../../../gastos/domain/gastos';

@Injectable()
export class VacinaMapper {
  constructor(
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>,
    @InjectRepository(VeterinarioEntity)
    private readonly veterinarioRepository: Repository<VeterinarioEntity>,
    @InjectRepository(GastoEntity)
    private readonly gastoRepository: Repository<GastoEntity>,
  ) {}

  paraDominio(vacinaEntity: VacinaEntity): Vacina {

    const animal = new Animal(
        vacinaEntity.animal.id,
        vacinaEntity.animal.nome,
        vacinaEntity.animal.especie,
        vacinaEntity.animal.sexo,
        vacinaEntity.animal.data_nascimento,
        vacinaEntity.animal.condicao_saude,
        vacinaEntity.animal.estado_adocao,
      );

      const veterinario = new Veterinario(
        vacinaEntity.veterinario.id,
        vacinaEntity.veterinario.especialidade,
        vacinaEntity.veterinario.registro_crmv
      );

      const gasto = new Gasto(
        vacinaEntity.gasto.id,
        vacinaEntity.gasto.data_gasto,
        vacinaEntity.gasto.tipo,
        vacinaEntity.gasto.quantidade,
        vacinaEntity.gasto.valor
      );

    return new Vacina(
      vacinaEntity.id,
      vacinaEntity.animal_id,
      vacinaEntity.data_vacinacao,
      vacinaEntity.tipo_vacina,
      vacinaEntity.veterinario_id,
      vacinaEntity.gasto_id
    );
  }

  async paraPersistencia(vacina: Vacina): Promise<VacinaEntity> {

    const entity = new VacinaEntity();
    entity.animal_id = vacina.animal_id;
    entity.data_vacinacao = vacina.data_vacinacao;
    entity.tipo_vacina = vacina.tipo_vacina;
    entity.veterinario_id = vacina.veterinario_id;

    return entity;
  }
}
