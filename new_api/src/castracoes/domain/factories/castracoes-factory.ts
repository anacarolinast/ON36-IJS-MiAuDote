import { Injectable } from '@nestjs/common';
import { Castracao } from '../castracao';
import { v4 as uuidv4 } from 'uuid';
import { CreateCastracaoDto } from 'src/castracoes/presenters/http/dto/create-castracao.dto';
import { Veterinario } from 'src/veterinarios/domain/veterinarios';
import { Animal } from 'src/animais/domain/animal';
import { Gasto } from 'src/gastos/domain/gastos';

@Injectable()
export class CastracaoFactory {
  create(data: CreateCastracaoDto, veterinario: Veterinario, animal: Animal, gasto: Gasto): Castracao {
    const castracaoId = uuidv4();

    return new Castracao(
      castracaoId,
      animal.id,
      data.data_castracao,
      data.condicao_pos,
      veterinario.id,
      gasto.id,
      veterinario,
      animal,
      gasto
    );
  }
}