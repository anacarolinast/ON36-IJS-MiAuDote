import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  async findAll(): Promise<Pessoa[]> {
    return this.pessoaRepository.find();
  }

  async findOne(id: number): Promise<Pessoa | null> {
    return this.pessoaRepository.findOne({
      where: { id }, 
    });
  }

  async create(createPessoaDto: CreatePessoaDto): Promise<Pessoa> {
    const pessoa = this.pessoaRepository.create(createPessoaDto);
    return this.pessoaRepository.save(pessoa);
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa> {
    await this.pessoaRepository.update(id, updatePessoaDto);
    return this.pessoaRepository.findOne({
      where: { id }, 
    });
  }

  async remove(id: number): Promise<{ affected: number }> {
    const result = await this.pessoaRepository.delete(id);
    return { affected: result.affected ?? 0 };
  }
}
