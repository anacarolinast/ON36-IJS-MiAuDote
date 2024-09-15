import { Test, TestingModule } from '@nestjs/testing';
import { PessoasService } from './pessoas.service';
import { Pessoa } from './entities/pessoa.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PessoasService', () => {
  let service: PessoasService;
  let repository: Repository<Pessoa>;

  const mockPessoaRepository = {
    find: jest.fn().mockResolvedValue([{
      id: 1,
      nome: 'João Silva',
      endereco: 'Rua das Flores, 123',
      telefone: ['11987654321'],
      email: 'joao.silva@example.com',
      cpf: '123.456.789-00',
      veterinario: null,
      adotante: null,
      doador: null,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      nome: 'João Silva',
      endereco: 'Rua das Flores, 123',
      telefone: ['11987654321'],
      email: 'joao.silva@example.com',
      cpf: '123.456.789-00',
      veterinario: null,
      adotante: null,
      doador: null,
    }),
    create: jest.fn().mockImplementation((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    save: jest.fn().mockImplementation((pessoa) => Promise.resolve(pessoa)),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoasService,
        {
          provide: getRepositoryToken(Pessoa),
          useValue: mockPessoaRepository,
        },
      ],
    }).compile();

    service = module.get<PessoasService>(PessoasService);
    repository = module.get<Repository<Pessoa>>(getRepositoryToken(Pessoa));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all pessoas', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{
      id: 1,
      nome: 'João Silva',
      endereco: 'Rua das Flores, 123',
      telefone: ['11987654321'],
      email: 'joao.silva@example.com',
      cpf: '123.456.789-00',
      veterinario: null,
      adotante: null,
      doador: null,
    }]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return one pessoa by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      nome: 'João Silva',
      endereco: 'Rua das Flores, 123',
      telefone: ['11987654321'],
      email: 'joao.silva@example.com',
      cpf: '123.456.789-00',
      veterinario: null,
      adotante: null,
      doador: null,
    });
    expect(repository.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new pessoa', async () => {
    const createDto = {
      nome: 'João Silva',
      endereco: 'Rua das Flores, 123',
      telefone: ['11987654321'],
      email: 'joao.silva@example.com',
      cpf: '123.456.789-00',
    };
    const result = await service.create(createDto);
    expect(result).toEqual({
      id: expect.any(Number),
      nome: 'João Silva',
      endereco: 'Rua das Flores, 123',
      telefone: ['11987654321'],
      email: 'joao.silva@example.com',
      cpf: '123.456.789-00',
      veterinario: null,
      adotante: null,
      doador: null,
    });
    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should update a pessoa', async () => {
    const updateDto = {
      nome: 'Maria Silva',
    };
    const result = await service.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      nome: 'Maria Silva',
      endereco: 'Rua das Flores, 123',
      telefone: ['11987654321'],
      email: 'joao.silva@example.com',
      cpf: '123.456.789-00',
      veterinario: null,
      adotante: null,
      doador: null,
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete a pessoa', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1 });
  });
});
