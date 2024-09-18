import { Injectable } from '@nestjs/common';
import { Consumivel } from '../consumivel';
import { v4 as uuidv4 } from 'uuid';
import { CreateConsumivelDto } from 'src/consumiveis/presenters/http/dto/create-consumivel.dto';

@Injectable()
export class ConsumivelFactory {
  create(data: CreateConsumivelDto): Consumivel {
    const castracaoId = uuidv4();

    return new Consumivel(
      castracaoId,
      data.tipo_animal,
      data.descricao,
      data.gasto_id
    );
  }
}