import { PessoaRepository } from '../application/ports/pessoas.repository';
import { Pessoa } from '../domain/pessoas';
import { Test, TestingModule } from '@nestjs/testing';
import { PessoasService } from './pessoas.service';
import { PessoaFactory } from '../domain/factories/pessoas-factory';
import { CreatePessoaDto } from '../presenters/http/dto/create-pessoa.dto';
import { UpdatePessoaDto } from '../presenters/http/dto/update-pessoa.dto';

describe('Pessoas', () => {
  let service: PessoasService;
  let pessoaFactory: PessoaFactory;
  let pessoaRepository: PessoaRepository;

  const createPessoaDto: CreatePessoaDto = {
    nome: 'João Silva',
    endereco: 'Rua das Flores, 123',
    telefone: ['11987654321'],
    email: 'joao@example.com',
    cpf: '123.456.789-00',
  };

  const updatePessoaDto: UpdatePessoaDto = {
    nome: 'Maria Silva',
    endereco: 'Rua das Flores, 123',
    telefone: ['11987654321'],
    email: 'maria@example.com',
    cpf: '123.456.789-00',
  };

  const pessoa = new Pessoa(
    1,
    'João Silva',
    'Rua das Flores, 123',
    ['11987654321'],
    'joao@example.com',
    '123.456.789-00'
  );

  beforeEach(async () => {
    pessoaFactory = {
      create: jest.fn().mockImplementation((data) => {
        return new Pessoa(
          1,
          data.nome,
          data.endereco,
          data.telefone,
          data.email,
          data.cpf,
        );
      }),
    };

    pessoaRepository = {
      save: jest.fn().mockImplementation((pessoa: Pessoa) => Promise.resolve(pessoa)),
      findAll: jest.fn().mockResolvedValue([pessoa]),
      findById: jest.fn().mockResolvedValue(pessoa),
      update: jest.fn().mockResolvedValue(pessoa),
      remove: jest.fn().mockResolvedValue(undefined),
    } as unknown as PessoaRepository;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoasService,
        {
          provide: PessoaRepository,
          useValue: pessoaRepository,
        },
        {
          provide: PessoaFactory,
          useValue: pessoaFactory,
        },
      ],
    }).compile();

    service = module.get<PessoasService>(PessoasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a person', async () => {
    const createdPessoa = await service.create(createPessoaDto);
    expect(createdPessoa).toBeInstanceOf(Pessoa);
    expect(createdPessoa.nome).toBe(createPessoaDto.nome);
    expect(pessoaRepository.save).toHaveBeenCalledWith(expect.any(Pessoa));
  });

  it('should return all people', async () => {
    const pessoas = await service.findAll();
    expect(pessoas).toHaveLength(1);
    expect(pessoas[0]).toBeInstanceOf(Pessoa);
    expect(pessoas[0].nome).toBe(pessoa.nome);
  });

  it('should return a person by ID', async () => {
    const foundPessoa = await service.findOne(1);
    expect(foundPessoa).toBeInstanceOf(Pessoa);
    expect(foundPessoa.id).toBe(1);
    expect(foundPessoa.nome).toBe(pessoa.nome);
  });

  it('should update a person', async () => {
    const updatedPessoa = await service.update(1, updatePessoaDto);
    expect(updatedPessoa).toBeInstanceOf(Pessoa);
    expect(updatedPessoa.nome).toBe(updatePessoaDto.nome);
    expect(pessoaRepository.update).toHaveBeenCalledWith(1, expect.any(Pessoa));
  });

  it('should delete a person', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(pessoaRepository.remove).toHaveBeenCalledWith(1);
  });
});
