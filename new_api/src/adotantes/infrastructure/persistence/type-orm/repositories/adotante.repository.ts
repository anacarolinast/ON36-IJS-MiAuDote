import { Inject, Injectable } from '@nestjs/common';
import { AdotanteRepository } from '../../../../../adotantes/application/ports/adotantes.repository';
import { Adotante } from '../../../../../adotantes/domain/adotante';
import { AdotanteEntity } from '../entities/adotante.entity';
import { AdotanteMapper } from '../mappers/adotante.mapper';
import { Adocao } from 'src/adocoes/domain/adocao'; 
import { PessoaEntity } from '../../../../../pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { PessoaRepository } from 'src/pessoas/application/ports/pessoas.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmAdotanteRepository implements AdotanteRepository {
    constructor(
        private readonly adotanteMapper: AdotanteMapper,
        @Inject(PessoaRepository)
        private readonly pessoaRepository: PessoaRepository,
        @InjectRepository(AdotanteEntity)
        private readonly adotanteRepository: Repository<AdotanteEntity>, 
    ) {}

    async save(adotante: Adotante): Promise<Adotante> {
        const pessoaEntity = new PessoaEntity();

        pessoaEntity.nome = adotante.nome;
        pessoaEntity.cep = adotante.cep;
        pessoaEntity.endereco = adotante.endereco;
        pessoaEntity.telefone = adotante.telefone;
        pessoaEntity.email = adotante.email;
        pessoaEntity.cpf = adotante.cpf;

        const savedPessoa = await this.pessoaRepository.save(pessoaEntity);

        const adotanteEntity = await this.adotanteMapper.paraPersistencia(adotante);
        adotanteEntity.pessoa_id = savedPessoa.id;
        adotanteEntity.pessoa = savedPessoa;

        const savedAdotanteEntity = await this.adotanteRepository.save(adotanteEntity);

        return AdotanteMapper.paraDominio(savedAdotanteEntity);
    }

    async findAll(): Promise<Adotante[]> {
        const entities = await this.adotanteRepository.find({ relations: ['pessoa'] });
        return entities.map(AdotanteMapper.paraDominio);
    }

    async findById(id: number): Promise<Adotante | null> {
        const entity = await this.adotanteRepository.findOne({ where: { id }, relations: ['pessoa'] });
        if (!entity) return null;
        return AdotanteMapper.paraDominio(entity);
    }

    async update(id: number, adotante: Partial<Adotante>): Promise<Adotante | null> {
        const existingAdotanteEntity = await this.adotanteRepository.findOne({ where: { id }, relations: ['pessoa'] });
        if (!existingAdotanteEntity) {
            console.log(`Adotante com ID ${id} não encontrado.`);
            return null;
        }

        existingAdotanteEntity.renda = adotante.renda ?? existingAdotanteEntity.renda;
        existingAdotanteEntity.condicao_entrevista = adotante.condicao_entrevista ?? existingAdotanteEntity.condicao_entrevista;

        const updatedAdotanteEntity = await this.adotanteRepository.save({
            ...existingAdotanteEntity,
            ...adotante,
        });

        return AdotanteMapper.paraDominio(updatedAdotanteEntity);
    }

    async remove(id: number): Promise<void> {
        const result = await this.adotanteRepository.delete(id);
        if (result.affected === 0) {
            console.log(`Adotante com ID ${id} não encontrado para remoção.`);
        } else {
            console.log(`Adotante com ID ${id} removido com sucesso!`);
        }
    }

    async adopt(adotanteId: number, adocao: Adocao): Promise<Adotante | null> {
        // Apenas imprime uma mensagem de log e retorna null -- IMPLEMENTAR
        console.log(`Tentativa de adoção para o adotante com ID ${adotanteId}.`);
        return null; // Retorna nulo
    }
}