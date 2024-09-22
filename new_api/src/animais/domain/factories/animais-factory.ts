import { Injectable } from '@nestjs/common';
import { Animal } from '../animal';
import { v4 as uuidv4 } from 'uuid';
import { CreateAnimalDto } from 'src/animais/presenters/http/dto/create-animal.dto';
import { Medicamento } from 'src/medicamentos/domain/medicamentos';
import { Vacina } from 'src/vacinas/domain/vacinas';
import { Adocao } from 'src/adocoes/domain/adocao';
import { Castracao } from 'src/castracoes/domain/castracao';

@Injectable()
export class AnimalFactory {
  create(data: CreateAnimalDto): Animal {
    const adocao: Adocao | null = null;
    const animalId = uuidv4();
    const medicamentos: Medicamento[] = [];
    const vacinas: Vacina[] = [];
    const castracao: Castracao | null = null;
    return new Animal(
      animalId,
      data.nome,
      data.especie,
      data.sexo,
      data.data_nascimento,
      data.condicao_saude,
      data.estado_adocao,
      adocao,
      medicamentos,
      vacinas,
      castracao
    );
  }
}