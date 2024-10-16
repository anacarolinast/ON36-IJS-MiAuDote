import { Inject, Injectable } from '@nestjs/common';
import { DoadorRepository } from '../../../../../doadores/application/ports/doador.repository';
import { Doador } from '../../../../../doadores/domain/doadores';
import { DoadorEntity } from '../entities/doador.entity';
import { DoadorMapper } from '../mappers/doador.mapper';
import { Doacao } from '../../../../../doacoes/domain/doacoes';
import { PessoaRepository } from 'src/pessoas/application/ports/pessoas.repository';
import { PessoaEntity } from 'src/pessoas/infrastructure/persistence/type-orm/entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmDoadorRepository implements DoadorRepository {
  constructor(
    private readonly doadorMapper: DoadorMapper,
    @Inject(PessoaRepository)
    private readonly pessoaRepository: PessoaRepository,
    @InjectRepository(DoadorEntity)
    private readonly doadorRepository: Repository<DoadorEntity>,
  ) {}

  async save(doador: Doador): Promise<Doador> {
    const pessoaEntity = new PessoaEntity();

    pessoaEntity.nome = doador.nome;
    pessoaEntity.cep = doador.cep;
    pessoaEntity.endereco = doador.endereco;
    pessoaEntity.telefone = doador.telefone;
    pessoaEntity.email = doador.email;
    pessoaEntity.cpf = doador.cpf;

    const savedPessoa = await this.pessoaRepository.save(pessoaEntity);
    console.log('Pessoa salva:', savedPessoa);

    const doadorEntity = await this.doadorMapper.paraPersistencia(doador);
    doadorEntity.pessoa_id = savedPessoa.id;
    doadorEntity.pessoa = savedPessoa;

    const savedDoadorEntity = await this.doadorRepository.save(doadorEntity);

    return DoadorMapper.paraDominio(savedDoadorEntity);
  }

  async findAll(): Promise<Doador[]> {
    const entities = await this.doadorRepository.find({ relations: ['pessoa'] });
    return entities.map(DoadorMapper.paraDominio);
  }

  async findById(id: number): Promise<Doador | null> {
    const entity = await this.doadorRepository.findOne({ where: { id }, relations: ['pessoa'] });
    if (!entity) return null;
    return DoadorMapper.paraDominio(entity);
  }

  async update(id: number, doador: Partial<Doador>): Promise<Doador | null> {
    const existingDoadorEntity = await this.doadorRepository.findOne({ where: { id }, relations: ['pessoa'] });
    if (!existingDoadorEntity) {
      console.log(`Doador com ID ${id} não encontrado.`);
      return null;
    }

    existingDoadorEntity.tipo_doacao = doador.tipo_doacao ?? existingDoadorEntity.tipo_doacao;
    existingDoadorEntity.descricao = doador.descricao ?? existingDoadorEntity.descricao;

    const updatedDoadorEntity = await this.doadorRepository.save(existingDoadorEntity);
    return DoadorMapper.paraDominio(updatedDoadorEntity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.doadorRepository.delete(id);
    if (result.affected === 0) {
      console.log(`Doador com ID ${id} não encontrado para remoção.`);
    } else {
      console.log(`Doador com ID ${id} removido com sucesso!`);
    }
  }

  async donate(doacaoId: number, doacao: Doacao): Promise<Doador | null> {
    console.log(`Tentativa de doação para o animal com ID ${doacaoId}.`);
    return null;
  }
}
