import { Injectable, NotFoundException } from '@nestjs/common';
import { Doacao } from '../domain/doacoes';
import { CreateDoacaoDto } from '../presenters/http/dto/create-doacao.dto';
import { UpdateDoacaoDto } from '../presenters/http/dto/update-doacao.dto';
import { DoacaoRepository } from './ports/doacao.repository';
import { GastoRepository } from '../../gastos/application/ports/gasto.repository';
import { Gasto } from 'src/gastos/domain/gastos';
import { GastoFactory } from 'src/gastos/domain/factories/gastos-factory';
import { CreateGastoDto } from 'src/gastos/presenters/http/dto/create-gasto.dto';
import { GastoType } from 'src/gastos/domain/enum/gasto.enum';

@Injectable()
export class DoacoesService {
  constructor(
    private readonly doacaoRepository: DoacaoRepository,
    private readonly gastoFactory: GastoFactory,
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

  async create(createDoacaoDto: CreateDoacaoDto): Promise<Doacao> {

    const gastoData: CreateGastoDto = {
      data_gasto: createDoacaoDto.data_gasto,
      tipo: createDoacaoDto.tipo,
      quantidade: createDoacaoDto.quantidade,
      valor: createDoacaoDto.valor
    };

    const gasto = this.gastoFactory.createGasto(GastoType.Castracao, gastoData, {});

    const newDoacao = new Doacao(
      gasto.id,
      createDoacaoDto.doador_id,
      createDoacaoDto.data_gasto,
      createDoacaoDto.tipo_doacao,
      createDoacaoDto.valor_estimado,
      gasto.id,
      gasto.data_gasto,
      gasto.tipo,
      gasto.quantidade,
      gasto.valor
    )

    return this.doacaoRepository.save(newDoacao);
}

async update(id: number, updateDoacaoDto: UpdateDoacaoDto): Promise<Doacao> {
  const doacao = await this.findOne(id);

  const updatedDoacaoData = {
    ...doacao,
    ...updateDoacaoDto,
  }

  const gasto = await this.gastoRepository.findById(updatedDoacaoData.gasto_id);
  if(!gasto){
    throw new NotFoundException(`Gasto with ID ${updatedDoacaoData.gasto_id} not found`)
  }

  const updatedGastoData = {
    ...gasto,
    data_gasto: updateDoacaoDto.data_gasto ?? gasto.data_gasto,
    tipo: updateDoacaoDto.tipo ?? gasto.tipo,
    quantidade: updateDoacaoDto.quantidade ?? gasto.quantidade,
    valor: updateDoacaoDto.valor ?? gasto.valor,
  }

  await this.doacaoRepository.update(gasto.id, updatedGastoData);

  const result = await this.doacaoRepository.update(id, updatedDoacaoData);

  if(!result){
    throw new NotFoundException(`Doacao with ID ${id} not found for update.`)
  }

  return updatedDoacaoData;}

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.doacaoRepository.remove(id);
    return { deleted: true };
  }
}
