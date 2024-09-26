import { Injectable, NotFoundException } from '@nestjs/common';
import { Doacao } from '../domain/doacoes';
import { CreateDoacaoDto } from '../presenters/http/dto/create-doacao.dto';
import { UpdateDoacaoDto } from '../presenters/http/dto/update-doacao.dto';
import { DoacaoFactory } from '../domain/factories/doacoes-factory';
import { DoacaoRepository } from './ports/doacao.repository';
import { DoadorRepository } from '../../doadores/application/ports/doador.repository';
import { GastoRepository } from '../../gastos/application/ports/gasto.repository';
import { Doador } from 'src/doadores/domain/doadores';
import { Gasto } from 'src/gastos/domain/gastos';

@Injectable()
export class DoacoesService {
  constructor(
    private readonly doacaoFactory: DoacaoFactory,
    private readonly doacaoRepository: DoacaoRepository,
    private readonly doadorRepository: DoadorRepository,
    private readonly gastoRepository: GastoRepository,
  ) {}

  async findAll(): Promise<Doacao[]> {
    return this.doacaoRepository.findAll();
  }

  async findOne(id: number): Promise<Doacao> {
    const doacao = await this.doacaoRepository.findById(id);
    if (!doacao) {
      throw new NotFoundException(`Doacao with ID ${id} not found`);
    }
    return doacao;
  }

  private async findGasto(gastoId: number): Promise<Gasto> {
    const gasto = await this.gastoRepository.findById(gastoId);
    if (!gasto) {
      throw new NotFoundException(`Gasto with ID ${gastoId} not found`);
    }
    return gasto;
  }

  private async findDoador(doadorId: number): Promise<Doador> {
    const doador = await this.doadorRepository.findById(doadorId);
    if (!doador) {
      throw new NotFoundException(`Doador with ID ${doadorId} not found`);
    }
    return doador;
  }

  async create(createDoacaoDto: CreateDoacaoDto): Promise<Doacao> {
    const gasto = await this.findGasto(createDoacaoDto.gasto_id);
    const doador = await this.findDoador(createDoacaoDto.doador_id);
  
    const newDoacao = this.doacaoFactory.create(createDoacaoDto, gasto, doador);

    const savedDoacao = await this.doacaoRepository.save(newDoacao);

    console.log('Antes da atualização da doação:', doador);
  
    const { doador: _, ...doacaoData } = savedDoacao; 
    doador.doacao.push(savedDoacao);
    await this.doadorRepository.donate(doador.id, doacaoData); 
    console.log('Depois da atualização do doador:', doador);

    await this.gastoRepository.update(gasto.id, gasto);
    console.log('Depois da atualização do gasto:', gasto);

    return savedDoacao;
}

async update(id: number, updateDoacaoDto: UpdateDoacaoDto): Promise<Doacao> {
  const doacao = await this.findOne(id);
  const gasto = updateDoacaoDto.gasto_id
    ? await this.gastoRepository.findById(updateDoacaoDto.gasto_id)
    : doacao.gasto;

  const doador = updateDoacaoDto.doador_id
    ? await this.doadorRepository.findById(updateDoacaoDto.doador_id)
    : doacao.doador;

  if (!gasto || !doador) {
    throw new NotFoundException('Gasto ou Doador não encontrado.');
  }

  const updatedDoacao = this.doacaoFactory.create(
    { ...doacao, ...updateDoacaoDto },
    gasto,
    doador
  );

  await this.doacaoRepository.update(id, updatedDoacao);
  return updatedDoacao;
}

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.doacaoRepository.remove(id);
    return { deleted: true };
  }
}
