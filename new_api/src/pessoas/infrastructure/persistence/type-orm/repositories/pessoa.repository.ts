import { Injectable } from '@nestjs/common';
import { PessoaRepository } from '../../../../../pessoas/application/ports/pessoas.repository';
import { Pessoa } from '../../../../../pessoas/domain/pessoas';
import { PessoaEntity } from '../entities/pessoa.entity';
import { PessoaMapper } from '../mappers/pessoa.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmPessoaRepository implements PessoaRepository {
  constructor(
    @InjectRepository(PessoaEntity)
    private readonly pessoaRepository: Repository<PessoaEntity>,
    private readonly pessoaMapper: PessoaMapper,
  ) {}

  async save(pessoa: Pessoa): Promise<Pessoa> {
    const pessoaEntity = await this.pessoaMapper.paraPersistencia(pessoa);
    
    const savedPessoaEntity = await this.pessoaRepository.save(pessoaEntity);
    
    return this.pessoaMapper.paraDominio(savedPessoaEntity);
  }

  async findAll(): Promise<Pessoa[]> {
    const entities = await this.pessoaRepository.find();
    return Promise.all(entities.map((item) => this.pessoaMapper.paraDominio(item)));
  }

  async findByCpf(cpf: string): Promise<Pessoa | null> {
    const pessoaEntity = await this.pessoaRepository.findOne({ where: { cpf } });
    return pessoaEntity ? this.pessoaMapper.paraDominio(pessoaEntity) : null;
  }

  async findById(id: number): Promise<Pessoa | null> {
    const pessoaEntity = await this.pessoaRepository.findOne({ where: { id } });
    return pessoaEntity ? this.pessoaMapper.paraDominio(pessoaEntity) : null;
  }

  async update(id: number, pessoa: Partial<Pessoa>): Promise<Pessoa | null> {
    const existingPessoaEntity = await this.pessoaRepository.findOne({ where: { id } });
    
    if (existingPessoaEntity) {
      const updatedPessoaEntity = await this.pessoaMapper.paraPersistencia({
        ...this.pessoaMapper.paraDominio(existingPessoaEntity),
        ...pessoa,
      });
      
      await this.pessoaRepository.update(id, updatedPessoaEntity);
      console.log(`Pessoa com ID ${id} atualizada com sucesso!`);
      
      return this.pessoaMapper.paraDominio({ ...existingPessoaEntity, ...updatedPessoaEntity });
    } else {
      console.log(`Pessoa com ID ${id} não encontrada para atualização.`);
      return null;
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.pessoaRepository.delete(id);
    
    if (result.affected > 0) {
      console.log(`Pessoa com ID ${id} removida com sucesso!`);
    } else {
      console.log(`Pessoa com ID ${id} não encontrada para remoção.`);
    }
  }
}
