import { Injectable, NotFoundException } from '@nestjs/common';
import { Castracao } from '../domain/castracao';
import { CreateCastracaoDto } from '../presenters/http/dto/create-castracao.dto';
import { UpdateCastracaoDto } from '../presenters/http/dto/update-castracao.dto';
import { CastracaoRepository } from './ports/castracoes.repository';
import { GastoFactory } from 'src/gastos/domain/factories/gastos-factory';
import { GastoRepository } from 'src/gastos/application/ports/gasto.repository';
import { CreateGastoDto } from 'src/gastos/presenters/http/dto/create-gasto.dto'
import { GastoType } from 'src/gastos/domain/enum/gasto.enum';

@Injectable()
export class CastracoesService {
  constructor(
    private readonly castracaoRepository: CastracaoRepository,
    private readonly gastoFactory: GastoFactory,
    private readonly gastoRepository: GastoRepository,
  ) {}

  async findAll(): Promise<Castracao[]> {
    return this.castracaoRepository.findAll();
  }

  async findOne(id: number): Promise<Castracao> {
    const castracao = await this.castracaoRepository.findById(id);
    if (!castracao) {
      throw new NotFoundException(`Castracao with ID ${id} not found`);
    }
    return castracao;
  }

  async create(createCastracaoDto: CreateCastracaoDto): Promise<Castracao> {

    const gastoData: CreateGastoDto = {
      data_gasto: createCastracaoDto.data_gasto,
      tipo: createCastracaoDto.tipo,
      quantidade: createCastracaoDto.quantidade,
      valor: createCastracaoDto.valor
    };
    
    const gasto = this.gastoFactory.createGasto(GastoType.Castracao, gastoData, {});
    
    const newCastracao = new Castracao(
      gasto.id,
      createCastracaoDto.animal_id,
      createCastracaoDto.data_castracao,
      createCastracaoDto.condicao_pos,
      createCastracaoDto.veterinario_id,
      gasto.id,
      gasto.data_gasto,
      gasto.tipo,
      gasto.quantidade,
      gasto.valor
    );

    return this.castracaoRepository.save(newCastracao);
  }

  async update(id: number, updateCastracaoDto: UpdateCastracaoDto): Promise<Castracao> {
    const castracao = await this.findOne(id);

    const updatedCastracaoData = {
      ...castracao,
      ...updateCastracaoDto,
    };

    const gasto = await this.gastoRepository.findById(updatedCastracaoData.gasto_id);
    if (!gasto){
      throw new NotFoundException(`Gasto with ID ${updatedCastracaoData.gasto_id} not found`)
    }

    const updatedGastoData = {
      ...gasto,
      data_gasto: updateCastracaoDto.data_gasto ?? gasto.data_gasto,
      tipo: updateCastracaoDto.tipo ?? gasto.tipo,
      quantidade: updateCastracaoDto.quantidade ?? gasto.quantidade,
      valor: updateCastracaoDto.valor ?? gasto.valor
    };

    await this.gastoRepository.update(gasto.id, updatedGastoData);

    const result = await this.castracaoRepository.update(id, updatedCastracaoData);
    if(!result){
      throw new NotFoundException(`Castração with ID ${id} not found for update.`)
    }

    return updatedCastracaoData;
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.castracaoRepository.remove(id);
    return { deleted: true };
  }
}
