import { Injectable } from "@nestjs/common";
import { CastracaoRepository } from "src/castracoes/application/ports/castracoes.repository";
import { Castracao } from "src/castracoes/domain/castracao";
import { CastracaoEntity } from "../entities/castracao.entity";

@Injectable()
export class InFileCastracaoRepository implements CastracaoRepository {
    private readonly castracoes = new Map<number, CastracaoEntity>();
    private idCounter = 1;

    async save(castracao: Castracao): Promise<Castracao> {
        const castracaoEntity = new CastracaoEntity();
        castracaoEntity.id = this.idCounter++;
        castracaoEntity.animal_id = castracao.animal_id;
        castracaoEntity.data_castracao = castracao.data_castracao;
        castracaoEntity.condicao_pos = castracao.condicao_pos;
        castracaoEntity.veterinario_id = castracao.veterinario_id;
        castracaoEntity.gasto_id = castracao.gasto_id;

        this.castracoes.set(castracaoEntity.id, castracaoEntity);

        console.log(`Castracao criada com sucesso!`); 
        return castracaoEntity;
    }

    async findAll(): Promise<Castracao[]> {
        console.log("Listando todas as castracoes...");
        return Array.from(this.castracoes.values());
    }

    async findById(id: number): Promise<Castracao | null> {
        const castracao = this.castracoes.get(id);
        if (castracao) {
            console.log(`Castracao encontrada: ${castracao.id}`);
            return castracao;
        } else {
            console.log(`Castracao com ID ${id} não encontrada.`);
            return null;
        }
    }

    async update(id: number, castracao: Partial<Castracao>): Promise<Castracao | null> {
        const existingCastracao = this.castracoes.get(id);
        if (existingCastracao) {
            const updatedCastracao = { ...existingCastracao, ...castracao };
            this.castracoes.set(id, updatedCastracao);
            console.log(`Castracao com ID ${id} atualizada com sucesso!`);
            return updatedCastracao;
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
