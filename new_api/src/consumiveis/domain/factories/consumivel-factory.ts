import { Injectable } from '@nestjs/common';
import { Consumivel } from '../consumivel';
import { v4 as uuidv4 } from 'uuid';
import { CreateConsumivelDto } from 'src/consumiveis/presenters/http/dto/create-consumivel.dto';
import { Gasto } from 'src/gastos/domain/gastos';

@Injectable()
export class ConsumivelFactory {
  create(data: CreateConsumivelDto, gasto: Gasto): Consumivel {
    const castracaoId = uuidv4();

    return new Consumivel(
      castracaoId,
      data.tipo_animal,
      data.descricao,
      gasto.id
    );
  }
}