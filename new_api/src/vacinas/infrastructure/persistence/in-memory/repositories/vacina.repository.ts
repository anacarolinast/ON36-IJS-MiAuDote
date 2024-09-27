import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VacinaRepository } from 'src/vacinas/application/ports/vacinas.repository';
import { Vacina } from 'src/vacinas/domain/vacinas';
import { VacinaEntity } from '../entities/vacina.entity';
import { VacinaMapper } from '../mappers/vacina.mapper';

@Injectable()
export class InMemoryVacinaRepository implements VacinaRepository {
  private readonly vacina = new Map<number, VacinaEntity>();
  private idCounter = 1;

  async save(vacina: Vacina): Promise<Vacina> {
    const vacinaEntity = VacinaMapper.paraPersistencia(vacina);
    vacinaEntity.id = this.idCounter++;
    this.vacina.set(vacinaEntity.id, vacinaEntity);
    console.log(`Vacina ${vacinaEntity.id} criado com sucesso!`);
    return VacinaMapper.paraDominio(vacinaEntity);
  }

  async findAll(): Promise<Vacina[]> {
    console.log("Listando todos os vacinas...");
    return Array.from(this.vacina.values()).map(vacinaEntity =>
        VacinaMapper.paraDominio(vacinaEntity)
    );
  }

  async findById(id: number): Promise<Vacina | null> {
    const vacinaEntity = this.vacina.get(id);
    if (vacinaEntity) {
        console.log(`Vacina encontrado: ${vacinaEntity.id}`);
        return VacinaMapper.paraDominio(vacinaEntity);
    } else {
        console.log(`Vacina com ID ${id} não encontrado.`);
        return null;
    }
  }

  async update(id: number, dadosAtualizados: Partial<Vacina>): Promise<Vacina | null> {
    const vacinaEntity = this.vacina.get(id);
        
    if (vacinaEntity) {
        Object.assign(vacinaEntity, dadosAtualizados);

        this.vacina.set(id, vacinaEntity);
        console.log(`Vacina com ID ${id} atualizada com sucesso!`);
        
        return VacinaMapper.paraDominio(vacinaEntity);
    } else {
        console.log(`Vacina com ID ${id} não encontrado.`);
        return null;
    }
  }

  async remove(id: number): Promise<void> {
    if (this.vacina.has(id)) {
      this.vacina.delete(id);
      console.log(`Vacina com ID ${id} removida com sucesso!`);
  } else {
      console.log(`Vacina com ID ${id} não encontrada para remoção.`);
  }
  }
}
