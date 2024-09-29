import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PessoaFactory } from './../domain/factories/pessoas-factory';
import { PessoaRepository } from "./ports/pessoas.repository";
import { Pessoa } from '../domain/pessoas';
import { CreatePessoaDto } from '../presenters/http/dto/create-pessoa.dto';
import { UpdatePessoaDto } from '../presenters/http/dto/update-pessoa.dto';
import { CepService } from '../infrastructure/adapters/cep-adapter.service';
import { validarCPF } from '../infrastructure/helpers/cpf-validator';

@Injectable()
export class PessoasService {
  constructor(
    private readonly pessoaRepository: PessoaRepository,
    private readonly pessoaFactory: PessoaFactory,
    private readonly cepService: CepService
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

//   private async validatePessoa(createOrUpdateDto: CreatePessoaDto | UpdatePessoaDto, isUpdate: boolean = false): Promise<void> {
//     const existingPessoa = await this.pessoaRepository.findByCpf(createOrUpdateDto.cpf);
//     if (existingPessoa && !isUpdate) {
//       throw new BadRequestException('CPF already in use');
//     } else if (existingPessoa && isUpdate && existingPessoa.id !== (createOrUpdateDto as UpdatePessoaDto).id) {
//       throw new BadRequestException('CPF already in use');
//     }

//     const endereco = await this.cepService.consultaCep(createOrUpdateDto.cep);
//     if (!endereco) {
//       throw new BadRequestException('Invalid CEP or address not found');
//     }

//     const cpfValido = validarCPF(createOrUpdateDto.cpf);
//     if (!cpfValido) {
//       throw new BadRequestException('Invalid CPF');
//     }
//   }

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
