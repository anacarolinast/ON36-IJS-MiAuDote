import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PessoaRepository } from "./ports/pessoas.repository";
import { Pessoa } from '../domain/pessoas';

@Injectable()
export class PessoasService {
  constructor(
    private readonly pessoaRepository: PessoaRepository,
  ) {}

  async findAll(): Promise<Pessoa[]> {
    try {
      return await this.pessoaRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve records');
    }
  }

  async findOne(id: number): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findById(id);
    if (!pessoa) {
      throw new NotFoundException(`Pessoa with ID ${id} not found`);
    }
    return pessoa;
  }

  async update(id: number, pessoaData: Partial<Pessoa>): Promise<Pessoa | null> {
    const existingPessoa = await this.findOne(id);

    try {
      Object.assign(existingPessoa, pessoaData);

      await this.pessoaRepository.update(id, existingPessoa);
      console.log(`Pessoa com ID ${id} atualizada com sucesso!`);

      return existingPessoa; 
    } catch (error) {
      throw new InternalServerErrorException('Failed to update pessoa'); 
    }
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.findOne(id);

    try {
      await this.pessoaRepository.remove(id);
      return { deleted: true };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete pessoa');
    }
  }
}
