import { PessoaFactory } from './../domain/factories/pessoas-factory';
import { Injectable } from "@nestjs/common";
import { PessoaRepository } from "./ports/pessoas.repository";
import { Pessoa } from '../domain/pessoas';
import { CreatePessoaDto } from '../presenters/http/dto/create-pessoa.dto';

@Injectable()
export class PessoasService {
  constructor (
    private readonly pessoaRepository: PessoaRepository,
    private readonly pessoaFactory: PessoaFactory,
  ) {}
  
  async findAll(): Promise<Pessoa[]> {
    return this.pessoaRepository.findAll();
  }

  async findOne(id: number): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findById(id);
    if (!pessoa) {
      throw new Error(`Pessoa with ID ${id} not found`);
    }
    return pessoa;
  }

  async create(createPessoaDto: CreatePessoaDto): Promise<Pessoa> {
    const newPessoa = this.pessoaFactory.create(createPessoaDto);
    return this.pessoaRepository.save(newPessoa);
  }

  async update(id: number, updatePessoaDto: any): Promise<Pessoa> {
    const pessoa = await this.findOne(id);

    const updatedPessoaData = {
      nome: updatePessoaDto.nome ?? pessoa.nome,
      endereco: updatePessoaDto.endereco ?? pessoa.endereco,
      telefone: updatePessoaDto.telefone ?? pessoa.telefone,
      email: updatePessoaDto.email ?? pessoa.email,
      cpf: updatePessoaDto.cpf ?? pessoa,
    };

    const updatedPessoa = this.pessoaFactory.create(updatedPessoaData);

    await this.pessoaRepository.update(id, updatedPessoa);
    return updatedPessoa;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.pessoaRepository.remove(id);
    return { deleted: true };
  }
}