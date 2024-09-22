import { PessoaFactory } from './../domain/factories/pessoas-factory';
import { Injectable, NotFoundException } from "@nestjs/common";
import { PessoaRepository } from "./ports/pessoas.repository";
import { Pessoa } from '../domain/pessoas';
import { DoadorRepository } from 'src/doadores/application/ports/doador.repository';
import { AdotanteRepository } from 'src/adotantes/application/ports/adotantes.repository';
import { VeterinarioRepository } from 'src/veterinarios/application/ports/veterinarios.repository';
import { Adotante } from 'src/adotantes/domain/adotante';
import { Doador } from 'src/doadores/domain/doadores';
import { Veterinario } from 'src/veterinarios/domain/veterinarios';
import { CreatePessoaDto } from '../presenters/http/dto/create-pessoa.dto';

@Injectable()
export class PessoasService {
  constructor (
    private readonly pessoaRepository: PessoaRepository,
    private readonly pessoaFactory: PessoaFactory,
    private readonly doadorRepository: DoadorRepository,
    private readonly adotanteRepository: AdotanteRepository,
    private readonly veterinarioRepository: VeterinarioRepository,
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

  private async findDoador(doadorId: number): Promise<Doador> {
    const doador = await this.doadorRepository.findById(doadorId);
    if (!doador) {
      throw new NotFoundException(`Doador with ID ${doadorId} not found`);
    }
    return doador;
  }

  private async findAdotante(adotanteId: number): Promise<Adotante> {
    const adotante = await this.adotanteRepository.findById(adotanteId);
    if (!adotante) {
      throw new NotFoundException(`Adotante with ID ${adotanteId} not found`);
    }
    return adotante;
  }

  private async findVeterinario(veterinarioId: number): Promise<Veterinario> {
    const veterinario = await this.veterinarioRepository.findById(veterinarioId);
    if (!veterinario) {
      throw new NotFoundException(`Veterinario with ID ${veterinarioId} not found`);
    }
    return veterinario;
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