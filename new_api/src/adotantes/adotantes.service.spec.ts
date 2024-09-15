import { Test, TestingModule } from '@nestjs/testing';
import { AdotantesService } from './adotantes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Adotante } from './entities/adotante.entity';
import { Repository } from 'typeorm';
import { CreateAdotanteDto } from './dto/create-adotante.dto';
import { UpdateAdotanteDto } from './dto/update-adotante.dto';

describe('Testando AdotantesService', () => {
  let service: AdotantesService;
  let repository: Repository<Adotante>;

  const mockAdotanteRepository = {
    create: jest.fn().mockImplementation((dto: CreateAdotanteDto) => dto),
    save: jest.fn().mockImplementation((adotante: Adotante) =>
      Promise.resolve({
        id: Date.now(),
        ...adotante,
      })
    ),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        renda: 3000,
        condicao_entrevista: 'Aprovado',
        pessoa_id: 1,
        pessoa: {
          id: 1,
          nome: 'João Silva',
          telefone: '123456789',
          endereco: 'Rua A, 123',
        },
        adocoes: [],
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      renda: 3000,
      condicao_entrevista: 'Aprovado',
      pessoa_id: 1,
      pessoa: {
        id: 1,
        nome: 'João Silva',
        telefone: '123456789',
        endereco: 'Rua A, 123',
      },
      adocoes: [],
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      renda: 5000,
      condicao_entrevista: 'Aprovado',
      pessoa_id: 1,
      pessoa: {
        id: 1,
        nome: 'João Silva',
        telefone: '123456789',
        endereco: 'Rua A, 123',
      },
      adocoes: [],
    }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdotantesService,
        {
          provide: getRepositoryToken(Adotante),
          useValue: mockAdotanteRepository, // Mockando o repositório
        },
      ],
    }).compile();

    service = module.get<AdotantesService>(AdotantesService);
    repository = module.get<Repository<Adotante>>(getRepositoryToken(Adotante));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new adotante', async () => {
    const dto: CreateAdotanteDto = {
      renda: 3000,
      condicao_entrevista: 'Aprovado',
      pessoa_id: 1,
    };

    const result = await service.create(dto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(dto);
  });

  it('should return an array of adotantes', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: 1,
        renda: 3000,
        condicao_entrevista: 'Aprovado',
        pessoa_id: 1,
        pessoa: {
          id: 1,
          nome: 'João Silva',
          telefone: '123456789',
          endereco: 'Rua A, 123',
        },
        adocoes: [],
      },
    ]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single adotante by ID', async () => {
    const id = 1;
    const result = await service.findOne(id);
    expect(result).toEqual({
      id,
      renda: 3000,
      condicao_entrevista: 'Aprovado',
      pessoa_id: 1,
      pessoa: {
        id: 1,
        nome: 'João Silva',
        telefone: '123456789',
        endereco: 'Rua A, 123',
      },
      adocoes: [],
    });
    expect(repository.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an adotante', async () => {
    const id = 1;
    const dto: UpdateAdotanteDto = {
      renda: 5000,
      condicao_entrevista: 'Aprovado',
    };

    const result = await service.update(id, dto);
    expect(result).toEqual({
      id,
      ...dto,
      pessoa_id: 1,
      pessoa: {
        id: 1,
        nome: 'João Silva',
        telefone: '123456789',
        endereco: 'Rua A, 123',
      },
      adocoes: [],
    });
    expect(repository.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove an adotante', async () => {
    const id = 1;
    const result = await service.remove(id);
    expect(result).toEqual({ id });
    expect(repository.remove).toHaveBeenCalledWith({ id });
  });
});
