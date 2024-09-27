import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CastracaoRepository } from 'src/castracoes/application/ports/castracoes.repository';
import { Castracao } from 'src/castracoes/domain/castracao';
import { CastracaoEntity } from '../entities/castracao.entity';
import { CastracaoMapper } from '../mappers/castracao.mappers';

@Injectable()
export class InMemoryCastracaoRepository implements CastracaoRepository {
  private readonly castracao = new Map<number, CastracaoEntity>();
  private idCounter = 1;

  async save(castracao: Castracao): Promise<Castracao> {
    const castracaoEntity = CastracaoMapper.paraPersistencia(castracao);
    castracaoEntity.id = this.idCounter++;
    this.castracao.set(castracaoEntity.id, castracaoEntity);
    console.log(`Castracao ${castracaoEntity.id} criado com sucesso!`);
    return CastracaoMapper.paraDominio(castracaoEntity);
  }

  async findAll(): Promise<Castracao[]> {
    console.log("Listando todos as castrações...");
    return Array.from(this.castracao.values()).map(castracaoEntity =>
        CastracaoMapper.paraDominio(castracaoEntity)
    );
  }

  async findById(id: number): Promise<Castracao | null> {
    const castracaoEntity = this.castracao.get(id);
    if (castracaoEntity) {
        console.log(`Castracao encontrado: ${castracaoEntity.id}`);
        return CastracaoMapper.paraDominio(castracaoEntity);
    } else {
        console.log(`Castracao com ID ${id} não encontrado.`);
        return null;
    }
  }

  async update(id: number, dadosAtualizados: Partial<Castracao>): Promise<Castracao | null> {
    const castracaoEntity = this.castracao.get(id);
        
    if (castracaoEntity) {
        Object.assign(castracaoEntity, dadosAtualizados);

        this.castracao.set(id, castracaoEntity);
        console.log(`Castracao com ID ${id} atualizada com sucesso!`);
        
        return CastracaoMapper.paraDominio(castracaoEntity);
    } else {
        console.log(`Castracao com ID ${id} não encontrado.`);
        return null;
    }
  }

  async remove(id: number): Promise<void> {
    if (this.castracao.has(id)) {
      this.castracao.delete(id);
      console.log(`Castracao com ID ${id} removida com sucesso!`);
  } else {
      console.log(`Castracao com ID ${id} não encontrada para remoção.`);
  }
  }
}
