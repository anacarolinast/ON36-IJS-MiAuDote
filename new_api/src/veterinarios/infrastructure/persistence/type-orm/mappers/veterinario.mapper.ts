import { Injectable } from '@nestjs/common';
import { Veterinario } from '../../../../domain/veterinarios';
import { VeterinarioEntity } from '../entities/veterinario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoaEntity } from '../../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { CastracaoEntity } from '../../../../../castracoes/infrastructure/persistence/type-orm/entities/castracao.entity';
import { VacinaEntity } from '../../../../../vacinas/infrastructure/persistence/type-orm/entities/vacina.entity';
import { MedicamentoEntity } from '../../../../../medicamentos/infrastructure/persistence/type-orm/entities/medicamento.entity';
import { Repository } from 'typeorm';
import { Pessoa } from '../../../../../pessoas/domain/pessoas';
import { Castracao } from '../../../../../castracoes/domain/castracao';
import { Vacina } from '../../../../../vacinas/domain/vacinas';
import { Medicamento } from '../../../../../medicamentos/domain/medicamentos';

@Injectable()
export class VeterinarioMapper {
  constructor(
    @InjectRepository(PessoaEntity)
    private readonly pessoaRepository: Repository<PessoaEntity>,
    @InjectRepository(MedicamentoEntity)
    private readonly medicamentoRepository: Repository<MedicamentoEntity>,
    @InjectRepository(CastracaoEntity)
    private readonly castracaoRepository: Repository<CastracaoEntity>,
    @InjectRepository(VacinaEntity)
    private readonly vacinaRepository: Repository<VacinaEntity>,
  ) {}

  paraDominio(veterinarioEntity: VeterinarioEntity): Veterinario {

    const pessoa = new Pessoa(
        veterinarioEntity.pessoa.id,
        veterinarioEntity.pessoa.nome,
        veterinarioEntity.pessoa.cep,
        veterinarioEntity.pessoa.endereco,
        veterinarioEntity.pessoa.telefone,
        veterinarioEntity.pessoa.email,
        veterinarioEntity.pessoa.cpf,
    );

    const medicamento = veterinarioEntity.medicamentos.map(medicamentoEntity => {
        return new Medicamento(
            medicamentoEntity.id,
            medicamentoEntity.animal_id, 
            medicamentoEntity.data_compra,
            medicamentoEntity.descricao,
            medicamentoEntity.veterinario_id,
            medicamentoEntity.gasto_id,
            // medicamentoEntity.data_gasto,
            // medicamentoEntity.tipo,
            // medicamentoEntity.quantidade,
            // medicamentoEntity.valor,
      );
    });

    const castracao = veterinarioEntity.castracoes.map(castracaoEntity => { 
        return new Castracao(
            castracaoEntity.id,
            castracaoEntity.animal_id,
            castracaoEntity.data_castracao,
            castracaoEntity.condicao_pos,
            castracaoEntity.veterinario_id,
            castracaoEntity.gasto_id
        );
    });

    const vacina = veterinarioEntity.vacinas.map(vacinaEntity => { 
        return new Vacina(
            vacinaEntity.id,
            vacinaEntity.animal_id,
            vacinaEntity.data_vacinacao,
            vacinaEntity.tipo_vacina,
            vacinaEntity.veterinario_id,
            vacinaEntity.gasto_id
        );
    });

    return new Veterinario(
      veterinarioEntity.id,
      veterinarioEntity.especialidade,
      veterinarioEntity.registro_crmv,
      [],
      [],
      [],
    );
  }

  async paraPersistencia(veterinario: Veterinario): Promise<VeterinarioEntity> {

    const entity = new VeterinarioEntity();
    entity.especialidade = veterinario.especialidade;
    entity.registro_crmv = veterinario.registro_crmv;
    entity.vacinas = [];
    entity.medicamentos = [];
    entity.castracoes = [];

    return entity;
  }
}
