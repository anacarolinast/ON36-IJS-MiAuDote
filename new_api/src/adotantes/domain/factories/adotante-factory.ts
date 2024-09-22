import { Injectable } from '@nestjs/common';
import { Adotante } from '../adotante';
import { v4 as uuidv4 } from 'uuid';
import { CreateAdotanteDto } from 'src/adotantes/presenters/http/dto/create-adotante.dto';
import { Pessoa } from '../../../pessoas/domain/pessoas';
import { Adocao } from 'src/adocoes/domain/adocao';

@Injectable()
export class AdotanteFactory {
  create(data: CreateAdotanteDto, pessoa: Pessoa): Adotante {
    const adotanteId = uuidv4();
    const adocoes: Adocao[] = []; 
    
    return new Adotante(
      adotanteId,
      data.renda,
      data.condicao_entrevista,
      pessoa.id,
      pessoa,
      adocoes
    );
  }
}