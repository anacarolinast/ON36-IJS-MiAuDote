import { Injectable, NotFoundException } from '@nestjs/common';
import { DoadorRepository } from 'src/doadores/application/ports/doador.repository';
import { Doador } from 'src/doadores/domain/doadores';
import { DoadorEntity } from '../entities/doador.entity';
import { DoadorMapper } from '../mappers/doador.mappers';
import { DoacaoMapper } from 'src/doacoes/infrastructure/persistence/in-memory/mappers/doacao.mappers';
import { Doacao } from 'src/doacoes/domain/doacoes';

@Injectable()
export class InMemoryDoadorRepository implements DoadorRepository {
    private readonly doadores = new Map<number, DoadorEntity>();
    private idCounter = 1;

    async save(doador: Doador): Promise<Doador> {
        const doadorEntity = DoadorMapper.paraPersistencia(doador);
        doadorEntity.id = this.idCounter++;
        this.doadores.set(doadorEntity.id, doadorEntity);
        console.log(`Doador ${doadorEntity.id} criado com sucesso!`); 
        return DoadorMapper.paraDominio(doadorEntity);
    }

    async findAll(): Promise<Doador[]> {
        console.log("Listando todos os doadores...");
        return Array.from(this.doadores.values()).map(doadoresEntity =>
            DoadorMapper.paraDominio(doadoresEntity)
        );
    }

    async findById(id: number): Promise<Doador | null> {
        const doadorEntity = this.doadores.get(id);
        if (doadorEntity) {
            console.log(`Doador encontrado: ${doadorEntity.id}`);
            return DoadorMapper.paraDominio(doadorEntity);
        } else {
            console.log(`Doador com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, dadosAtualizados: Partial<Doador>): Promise<Doador | null> {
        const doadorEntity = this.doadores.get(id);
        
        if (doadorEntity) {
            Object.assign(doadorEntity, dadosAtualizados);
                        
            this.doadores.set(id, doadorEntity);
            console.log(`Doador com ID ${id} atualizado com sucesso!`);

            return DoadorMapper.paraDominio(doadorEntity);;
        } else {
            console.log(`Doador com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.doadores.has(id)) {
            this.doadores.delete(id);
            console.log(`Doador com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Doador com ID ${id} não encontrada para remoção.`);
        }
    }

    async donate(doadorId: number, novaDoacao: Doacao): Promise<Doador | null> {
        const doadorEntity = this.doadores.get(doadorId);
    
        if (doadorEntity) {
            const doador = DoadorMapper.paraDominio(doadorEntity);
            console.log('Doador antes de adicionar a nova doação:', doador);
            
            doador.doacao.push({
              id: novaDoacao.id,
              doador_id: novaDoacao.doador_id,
              data_doacao: novaDoacao.data_doacao,
              tipo_doacao: novaDoacao.tipo_doacao,
              valor_estimado: novaDoacao.valor_estimado,
              gasto_id: novaDoacao.gasto_id,
              gasto: novaDoacao.gasto,
              doador: undefined,
            });

            console.log('Doador após adicionar nova doação:', doador);

            const updatedDoadorEntity = DoadorMapper.paraPersistencia(doador);
            this.doadores.set(doadorId, updatedDoadorEntity);
            console.log(`Doador com ID ${doadorId} atualizado com nova doação no repositório.`);
    
            return doador;
        } else {
            console.log(`Doador com ID ${doadorId} não encontrado para adicionar doação.`);
            return null;
        }
    }
}
