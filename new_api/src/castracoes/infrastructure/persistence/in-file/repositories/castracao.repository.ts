import { Injectable } from "@nestjs/common";
import { CastracaoRepository } from "src/castracoes/application/ports/castracoes.repository";
import { Castracao } from "src/castracoes/domain/castracao";
import { CastracaoEntity } from "../entities/castracao.entity";
import { CastracaoMapper } from "../mappers/castracao.mappers";
import { Veterinario } from "src/veterinarios/domain/veterinarios";

@Injectable()
export class InFileCastracaoRepository implements CastracaoRepository {
    private readonly castracoes = new Map<number, CastracaoEntity>();
    private idCounter = 1;

    async save(castracao: Castracao): Promise<Castracao> {
        const castracaoEntity = new CastracaoEntity();
        castracaoEntity.id = this.idCounter++;
        this.castracoes.set(castracaoEntity.id, castracaoEntity);
        console.log(`Castracao ${castracaoEntity.id} criada com sucesso!`); 
        return CastracaoMapper.paraDominio(castracaoEntity);
    }

    async findAll(): Promise<Castracao[]> {
        console.log("Listando todas as castracoes...");
        return Array.from(this.castracoes.values()).map(castracaoEntity =>
            CastracaoMapper.paraDominio(castracaoEntity)
        );
    }

    async findById(id: number): Promise<Castracao | null> {
        const castracaoEntity = this.castracoes.get(id);
        if (castracaoEntity) {
            console.log(`Castracao encontrada: ${castracaoEntity.id}`);
            return CastracaoMapper.paraDominio(castracaoEntity);
        } else {
            console.log(`Castracao com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, dadosAtualizados: Partial<Castracao>): Promise<Castracao | null> {
        const castracaoEntity = this.castracoes.get(id);

        if (castracaoEntity) {
            Object.assign(castracaoEntity, dadosAtualizados);

            this.castracoes.set(id, castracaoEntity);
            console.log(`Castração com ID ${id} atualizada com sucesso!`);
            
            return CastracaoMapper.paraDominio(castracaoEntity);
        } else {
            console.log(`Castracao com ID ${id} não encontrada para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.castracoes.has(id)) {
            this.castracoes.delete(id);
            console.log(`Castracao com ID ${id} removida com sucesso!`);
        } else {
            console.log(`Castracao com ID ${id} não encontrada para remoção.`);
        }
    }
}
