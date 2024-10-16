import { Injectable } from '@nestjs/common';
import { Vacina } from '../../../../domain/vacinas';
import { VacinaEntity } from '../entities/vacina.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GastoEntity } from '../../../../../gastos/infrastructure/persistence/type-orm/entities/gasto.entity';
import { Repository } from 'typeorm';
import { Gasto } from '../../../../../gastos/domain/gastos';

@Injectable()
export class VacinaMapper {
  constructor(
    @InjectRepository(GastoEntity)
    private readonly gastoRepository: Repository<GastoEntity>,
  ) {}

  static paraDominio(vacinaEntity: VacinaEntity): Vacina {
    console.log('Convertendo VacinaEntity para Vacina...');
    console.log('Dados da VacinaEntity:', vacinaEntity);

    const gasto = vacinaEntity.gasto;
    if (!gasto) {
      console.error('Gasto é undefined!', vacinaEntity);
      throw new Error('Gasto não encontrado!');
    }
    console.log('Gasto:', gasto);

    return new Vacina(
      vacinaEntity.id,
      vacinaEntity.animal_id,
      vacinaEntity.data_vacinacao,
      vacinaEntity.tipo_vacina,
      vacinaEntity.veterinario_id,
      gasto.id,
      gasto.data_gasto,
      gasto.tipo,
      gasto.quantidade,
      gasto.valor,
    );
  }

  async paraPersistencia(vacina: Vacina): Promise<VacinaEntity> {
    console.log('Convertendo Vacina para VacinaEntity...');

    const entity = new VacinaEntity();
    entity.animal_id = vacina.animal_id;
    entity.data_vacinacao = vacina.data_vacinacao;
    entity.tipo_vacina = vacina.tipo_vacina;
    entity.veterinario_id = vacina.veterinario_id;

    console.log('VacinaEntity criada:', entity);

    return entity;
  }
}
