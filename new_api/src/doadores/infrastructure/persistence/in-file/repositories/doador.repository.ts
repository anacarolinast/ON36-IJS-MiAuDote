import { Injectable, NotFoundException } from "@nestjs/common";
import { DoadorRepository } from "src/doadores/application/ports/doador.repository";
import { Doador } from "src/doadores/domain/doadores";
import { DoadorEntity } from "../entities/doador.entity";
import { DoadorMapper } from "../mappers/doador.mappers";
import { Doacao } from "src/doacoes/domain/doacoes";
import { PessoaEntity } from "src/pessoas/infrastructure/persistence/in-file/entities/pessoa.entity";
import { PessoaRepository } from "src/pessoas/application/ports/pessoas.repository";

@Injectable()
export class InFileDoadorRepository implements DoadorRepository {
    private readonly doadores = new Map<number, DoadorEntity>();
    private idCounter = 1;

    private pessoaRepository: PessoaRepository;

    constructor(pessoaRepository: PessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    async save(doador: Doador): Promise<Doador> {
        const pessoaEntity = new PessoaEntity();
        pessoaEntity.nome = doador.nome;
        pessoaEntity.cep = doador.cep;
        pessoaEntity.endereco = doador.endereco;
        pessoaEntity.telefone = doador.telefone;
        pessoaEntity.email = doador.email;
        pessoaEntity.cpf = doador.cpf;

        const savedPessoa = await this.pessoaRepository.save(pessoaEntity);

        const doadorEntity = DoadorMapper.paraPersistencia(doador);
        doadorEntity.id = this.idCounter++;
        doadorEntity.pessoa_id = savedPessoa.id;
        doadorEntity.pessoa = savedPessoa;

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
    
        if (!doadorEntity) {
            console.log(`Doador com ID ${id} não encontrado.`);
        }
    
        if (dadosAtualizados.nome || dadosAtualizados.email || dadosAtualizados.cpf || dadosAtualizados.cep || dadosAtualizados.endereco || dadosAtualizados.telefone) {
            const pessoaEntity = doadorEntity.pessoa;
            Object.assign(pessoaEntity, {
                nome: dadosAtualizados.nome ?? pessoaEntity.nome,
                email: dadosAtualizados.email ?? pessoaEntity.email,
                cpf: dadosAtualizados.cpf ?? pessoaEntity.cpf,
                cep: dadosAtualizados.cep ?? pessoaEntity.cep,
                endereco: dadosAtualizados.endereco ?? pessoaEntity.endereco,
                telefone: dadosAtualizados.telefone ?? pessoaEntity.telefone
            });
    
            await this.pessoaRepository.update(pessoaEntity.id, pessoaEntity);
        }
    
        Object.assign(doadorEntity, {
            doacao: dadosAtualizados.doacao ?? doadorEntity.doacao,
        });
    
        this.doadores.set(id, doadorEntity);
    
        console.log(`Doador com ID ${id} e seus dados de pessoa atualizados com sucesso!`);
        return DoadorMapper.paraDominio(doadorEntity);
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
            doador.doacao.push(novaDoacao);
            console.log('Doador após adicionar nova doação:', doador);

            const updatedDoadorEntity = DoadorMapper.paraPersistencia(doador);
            this.doadores.set(doadorId, updatedDoadorEntity);
            console.log(`Doador com ID ${doadorId} atualizado com nova doação no repositório.`);
    
            return doador;
        } else {
            console.log(`Doador com ID ${doadorId} não encontrado para adicionar doação.`);
        }
    }
}
