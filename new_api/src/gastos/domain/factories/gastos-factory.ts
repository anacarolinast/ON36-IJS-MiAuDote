import { Injectable } from '@nestjs/common';
import { Gasto } from '../gastos';
import { v4 as uuidv4 } from 'uuid';
import { CreateGastoDto } from 'src/gastos/presenters/http/dto/create-gasto.dto';

@Injectable()
export class GastoFactory {
  create(data: CreateGastoDto): Gasto {
    const castracaoId = uuidv4();

    return new Gasto(
      castracaoId,
      data.data_gasto,
      data.tipo,
      data.quantidade,
      data.valor
    );
  }
}