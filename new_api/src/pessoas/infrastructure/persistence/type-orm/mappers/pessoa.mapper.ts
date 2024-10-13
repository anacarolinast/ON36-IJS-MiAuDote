import { Injectable } from '@nestjs/common';
import { Pessoa } from '../../../../domain/pessoas';
import { PessoaEntity } from '../entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DoadorEntity } from '../../../../../doadores/infrastructure/persistence/type-orm/entities/doador.entity';
import { VeterinarioEntity } from '../../../../../veterinarios/infrastructure/persistence/type-orm/entities/veterinario.entity';
import { AdotanteEntity } from '../../../../../adotantes/infrastructure/persistence/type-orm/entities/adotante.entity';
import { Repository } from 'typeorm';
import { Doador } from '../../../../../doadores/domain/doadores';
import { Veterinario } from '../../../../../veterinarios/domain/veterinarios';
import { Adotante } from '../../../../../adotantes/domain/adotante';

@Injectable()
export class PessoaMapper {
  constructor(
    @InjectRepository(DoadorEntity)
    private readonly doadorRepository: Repository<DoadorEntity>,
    @InjectRepository(VeterinarioEntity)
    private readonly veterinarioRepository: Repository<VeterinarioEntity>,
    @InjectRepository(AdotanteEntity)
    private readonly adotanteRepository: Repository<AdotanteEntity>,
  ) {}

  paraDominio(pessoaEntity: PessoaEntity): Pessoa {

    const doador = new Doador(
        pessoaEntity.doador.id,
        pessoaEntity.doador.tipo_doacao,
        pessoaEntity.doador.descricao
      );

      const veterinario = new Veterinario(
        pessoaEntity.veterinario.id,
        pessoaEntity.veterinario.especialidade,
        pessoaEntity.veterinario.registro_crmv
      );

      const adotante = new Adotante(
        pessoaEntity.adotante.id,
        pessoaEntity.adotante.renda,
        pessoaEntity.adotante.condicao_entrevista,
      );

    return new Pessoa(
      pessoaEntity.id,
      pessoaEntity.nome,
      pessoaEntity.cep,
      pessoaEntity.endereco,
      pessoaEntity.telefone,
      pessoaEntity.email,
      pessoaEntity.cpf
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

    return entity;
  }
}
