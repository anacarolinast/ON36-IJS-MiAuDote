import { Injectable } from "@nestjs/common";
import { VeterinarioRepository } from "src/veterinarios/application/ports/veterinarios.repository";
import { Veterinario } from "src/veterinarios/domain/veterinarios";
import { VeterinarioEntity } from "../entities/veterinario.entity";
import { VeterinarioMapper } from "../mappers/veterinario.mapper";
import { Vacina } from "src/vacinas/domain/vacinas";
import { PessoaEntity } from "src/pessoas/infrastructure/persistence/in-file/entities/pessoa.entity";
import { PessoaRepository } from "src/pessoas/application/ports/pessoas.repository";

@Injectable()
export class InFileVeterinarioRepository implements VeterinarioRepository {
    private readonly veterinarios = new Map<number, VeterinarioEntity>();
    private idCounter = 1;

    private pessoaRepository: PessoaRepository;

    constructor(pessoaRepository: PessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }

    async save(veterinario: Veterinario): Promise<Veterinario> {
        const pessoaEntity = new PessoaEntity();
        pessoaEntity.nome = veterinario.nome;
        pessoaEntity.cep = veterinario.cep;
        pessoaEntity.endereco = veterinario.endereco;
        pessoaEntity.telefone = veterinario.telefone;
        pessoaEntity.email = veterinario.email;
        pessoaEntity.cpf = veterinario.cpf;

        const savedPessoa = await this.pessoaRepository.save(pessoaEntity);

        const veterinarioEntity = VeterinarioMapper.paraPersistencia(veterinario);
        veterinarioEntity.id = this.idCounter++;
        veterinarioEntity.pessoa_id = savedPessoa.id;
        veterinarioEntity.pessoa = savedPessoa;

        this.veterinarios.set(veterinarioEntity.id, veterinarioEntity);
        console.log(`Veterinario ${veterinarioEntity.id} criado com sucesso!`);

        return VeterinarioMapper.paraDominio(veterinarioEntity);
    }

    async findAll(): Promise<Veterinario[]> {
        console.log("Listando todos os veterinarios...");
        return Array.from(this.veterinarios.values()).map(veterinarioEntity =>
            VeterinarioMapper.paraDominio(veterinarioEntity)
        );
    }

    async findById(id: number): Promise<Veterinario | null> {
        const veterinarioEntity = this.veterinarios.get(id);
        if (veterinarioEntity) {
            console.log(`Veterinario encontrado: ${veterinarioEntity.id}`);
            return VeterinarioMapper.paraDominio(veterinarioEntity);
        } else {
            console.log(`Veterinario com ID ${id} não encontrado.`);
            return null;
        }
    }

    async update(id: number, veterinario: Partial<Veterinario>): Promise<Veterinario | null> {
        const existingVeterinarioEntity = this.veterinarios.get(id);
        if (existingVeterinarioEntity) {
            const updatedVeterinarioEntity = VeterinarioMapper.paraPersistencia({
                ...VeterinarioMapper.paraDominio(existingVeterinarioEntity),
                ...veterinario,
                id: existingVeterinarioEntity.id
            });

            this.veterinarios.set(id, updatedVeterinarioEntity);
            console.log(`Veterinario com ID ${id} atualizado com sucesso!`);
            return VeterinarioMapper.paraDominio(updatedVeterinarioEntity);
        } else {
            console.log(`Veterinario com ID ${id} não encontrado para atualização.`);
            return null;
        }
    }

    async remove(id: number): Promise<void> {
        if (this.veterinarios.has(id)) {
            this.veterinarios.delete(id);
            console.log(`Veterinario com ID ${id} removido com sucesso!`);
        } else {
            console.log(`Veterinario com ID ${id} não encontrado para remoção.`);
        }
    }

    async vaccinate(id: number, vacina: Vacina): Promise<Veterinario | null> {
        const existingVeterinarioEntity = this.veterinarios.get(id);
        if (existingVeterinarioEntity) {
            const existingVeterinario = VeterinarioMapper.paraDominio(existingVeterinarioEntity);

            existingVeterinario.vacinas.push(vacina);
            const updatedVeterinarioEntity = VeterinarioMapper.paraPersistencia(existingVeterinario);

            this.veterinarios.set(id, updatedVeterinarioEntity);
            return VeterinarioMapper.paraDominio(updatedVeterinarioEntity);
        } else {
            console.log(`Veterinario com ID ${id} não encontrado para vacinação.`);
            return null;
        }
    }

    async medicate(id: number, medicamento: any): Promise<Veterinario | null> {
        const existingVeterinarioEntity = this.veterinarios.get(id);
        if (existingVeterinarioEntity) {
            const existingVeterinario = VeterinarioMapper.paraDominio(existingVeterinarioEntity);

            existingVeterinario.medicamentos.push(medicamento);
            const updatedVeterinarioEntity = VeterinarioMapper.paraPersistencia(existingVeterinario);

            this.veterinarios.set(id, updatedVeterinarioEntity);
            return VeterinarioMapper.paraDominio(updatedVeterinarioEntity);
        } else {
            console.log(`Veterinario com ID ${id} não encontrado para medicação.`);
            return null;
        }
    }

    async castrate(id: number, castracao: any): Promise<Veterinario | null> {
        const existingVeterinarioEntity = this.veterinarios.get(id);
        if (existingVeterinarioEntity) {
            const existingVeterinario = VeterinarioMapper.paraDominio(existingVeterinarioEntity);

            existingVeterinario.castracoes.push(castracao);
            const updatedVeterinarioEntity = VeterinarioMapper.paraPersistencia(existingVeterinario);

            this.veterinarios.set(id, updatedVeterinarioEntity);
            return VeterinarioMapper.paraDominio(updatedVeterinarioEntity);
        } else {
            console.log(`Veterinario com ID ${id} não encontrado para castração.`);
            return null;
        }
    }
}
