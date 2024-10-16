import { Inject, Injectable } from '@nestjs/common';
import { VeterinarioRepository } from '../../../../../veterinarios/application/ports/veterinarios.repository';
import { Veterinario } from '../../../../../veterinarios/domain/veterinarios';
import { VeterinarioEntity } from '../entities/veterinario.entity';
import { VeterinarioMapper } from '../mappers/veterinario.mapper';
import { Castracao } from '../../../../../castracoes/domain/castracao';
import { Vacina } from '../../../../../vacinas/domain/vacinas';
import { Medicamento } from '../../../../../medicamentos/domain/medicamentos';
import { PessoaRepository } from 'src/pessoas/application/ports/pessoas.repository';
import { PessoaEntity } from 'src/pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmVeterinarioRepository implements VeterinarioRepository {
  constructor(
    private readonly veterinarioMapper: VeterinarioMapper,
    @Inject(PessoaRepository)
    private readonly pessoaRepository: PessoaRepository,
    @InjectRepository(VeterinarioEntity)
    private readonly veterinarioRepository: Repository<VeterinarioEntity>,
  ) {}

  async save(veterinario: Veterinario): Promise<Veterinario> {
    const pessoaEntity = new PessoaEntity();

    pessoaEntity.nome = veterinario.nome;
    pessoaEntity.cep = veterinario.cep;
    pessoaEntity.endereco = veterinario.endereco;
    pessoaEntity.telefone = veterinario.telefone;
    pessoaEntity.email = veterinario.email;
    pessoaEntity.cpf = veterinario.cpf;

    const savedPessoa = await this.pessoaRepository.save(pessoaEntity);
    console.log('Pessoa salva:', savedPessoa);

    const veterinarioEntity =
      await this.veterinarioMapper.paraPersistencia(veterinario);

    veterinarioEntity.pessoa_id = savedPessoa.id;
    veterinarioEntity.pessoa = savedPessoa;

    const savedVeterinarioEntity =
      await this.veterinarioRepository.save(veterinarioEntity);

    return VeterinarioMapper.paraDominio(savedVeterinarioEntity);
  }

  async findAll(): Promise<Veterinario[]> {
    const entities = await this.veterinarioRepository.find({
      relations: ['pessoa'],
    });
    return entities.map(VeterinarioMapper.paraDominio);
  }

  async findById(id: number): Promise<Veterinario | null> {
    const entity = await this.veterinarioRepository.findOne({
      where: { id },
      relations: ['pessoa'],
    });
    if (!entity) return null;
    return VeterinarioMapper.paraDominio(entity);
  }

  async update(
    id: number,
    veterinario: Partial<Veterinario>,
  ): Promise<Veterinario | null> {
    const existingVeterinarioEntity = await this.veterinarioRepository.findOne({
      where: { id },
      relations: ['pessoa'],
    });
    if (!existingVeterinarioEntity) {
      console.log(`Veterinario com ID ${id} não encontrado.`);
      return null;
    }

    existingVeterinarioEntity.especialidade =
      veterinario.especialidade ?? existingVeterinarioEntity.especialidade;
    existingVeterinarioEntity.registro_crmv =
      veterinario.registro_crmv ?? existingVeterinarioEntity.registro_crmv;

    const updatedVeterinarioEntity = await this.veterinarioRepository.save(
      existingVeterinarioEntity,
    );

    return VeterinarioMapper.paraDominio(updatedVeterinarioEntity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.veterinarioRepository.delete(id);
    if (result.affected === 0) {
      console.log(`Veterinário com ID ${id} não encontrado para remoção.`);
    } else {
      console.log(`Veterinário com ID ${id} removido com sucesso!`);
    }
  }

  async vaccinate(id: number, vacina: Vacina): Promise<Veterinario | null> {
    return null;
  }
  async medicate(
    id: number,
    medicamento: Medicamento,
  ): Promise<Veterinario | null> {
    return null;
  }
  async castrate(
    id: number,
    castracao: Castracao,
  ): Promise<Veterinario | null> {
    return null;
  }
}
