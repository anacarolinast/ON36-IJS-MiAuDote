import { Injectable } from '@nestjs/common';
import { Pessoa } from '../../../../domain/pessoas';
import { PessoaEntity } from '../entities/pessoa.entity';

@Injectable()
export class PessoaMapper {
  paraDominio(pessoaEntity: PessoaEntity): Pessoa {
    const doadorId = pessoaEntity.doador ? pessoaEntity.doador.id : undefined;
    const veterinarioId = pessoaEntity.veterinario ? pessoaEntity.veterinario.id : undefined;
    const adotanteId = pessoaEntity.adotante ? pessoaEntity.adotante.id : undefined;

    return new Pessoa(
      pessoaEntity.id,
      pessoaEntity.nome,
      pessoaEntity.cep,
      pessoaEntity.endereco,
      pessoaEntity.telefone,
      pessoaEntity.email,
      pessoaEntity.cpf,
      adotanteId, 
      doadorId, 
      veterinarioId 
    );
  }

  async paraPersistencia(pessoa: Pessoa): Promise<PessoaEntity> {
    const entity = new PessoaEntity();
    entity.nome = pessoa.nome;
    entity.cep = pessoa.cep;
    entity.endereco = pessoa.endereco;
    entity.telefone = pessoa.telefone;
    entity.email = pessoa.email;
    entity.cpf = pessoa.cpf;

    // Ajustar as referências para adotante, doador e veterinário
    if (pessoa.adotanteId) {
      entity.adotante = { id: pessoa.adotanteId } as any; 
    }
    if (pessoa.doadorId) {
      entity.doador = { id: pessoa.doadorId } as any; 
    }
    if (pessoa.veterinarioId) {
      entity.veterinario = { id: pessoa.veterinarioId } as any; 
    }

    return entity;
  }
}
