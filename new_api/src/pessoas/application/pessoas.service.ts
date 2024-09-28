import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PessoaFactory } from './../domain/factories/pessoas-factory';
import { PessoaRepository } from "./ports/pessoas.repository";
import { Pessoa } from '../domain/pessoas';
import { CreatePessoaDto } from '../presenters/http/dto/create-pessoa.dto';
import { UpdatePessoaDto } from '../presenters/http/dto/update-pessoa.dto';
import { CepService } from '../infrastructure/adapters/cep-adapter.service';

@Injectable()
export class PessoasService {
  constructor(
    private readonly pessoaRepository: PessoaRepository,
    private readonly pessoaFactory: PessoaFactory,
    private readonly cepService: CepService,
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

  async findByCpf(cpf: string): Promise<Pessoa | null> {
    return this.pessoaRepository.findByCpf(cpf) || null;
  }

  private async validatePessoa(createOrUpdateDto: CreatePessoaDto | UpdatePessoaDto, isUpdate: boolean = false): Promise<void> {
    const existingPessoa = await this.pessoaRepository.findByCpf(createOrUpdateDto.cpf);
    if (existingPessoa && !isUpdate) {
      throw new BadRequestException('CPF already in use');
    } else if (existingPessoa && isUpdate && existingPessoa.id !== (createOrUpdateDto as UpdatePessoaDto).id) {
      throw new BadRequestException('CPF already in use');
    }

    const endereco = await this.cepService.consultaCep(createOrUpdateDto.cep);
    if (!endereco) {
      throw new BadRequestException('Invalid CEP or address not found');
    }
  }

  async create(createPessoaDto: CreatePessoaDto): Promise<Pessoa> {
    await this.validatePessoa(createPessoaDto);

    const newPessoaData = {
      ...createPessoaDto,
      endereco: await this.cepService.consultaCep(createPessoaDto.cep),
    };
    
    try {
      const newPessoa = this.pessoaFactory.create(newPessoaData);
      return await this.pessoaRepository.save(newPessoa);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create pessoa');
    }
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto): Promise<Pessoa> {
    const pessoa = await this.findOne(id);

    updatePessoaDto.id = id;

    await this.validatePessoa(updatePessoaDto, true);

    const updatedPessoaData = {
      nome: updatePessoaDto.nome ?? pessoa.nome,
      cep: updatePessoaDto.cep ?? pessoa.cep,
      endereco: updatePessoaDto.endereco ?? pessoa.endereco,
      telefone: updatePessoaDto.telefone ?? pessoa.telefone,
      email: updatePessoaDto.email ?? pessoa.email,
      cpf: updatePessoaDto.cpf ?? pessoa.cpf,
    };

    const updatedPessoa = this.pessoaFactory.create(updatedPessoaData);

    try {
      await this.pessoaRepository.update(id, updatedPessoa);
      return updatedPessoa;
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
