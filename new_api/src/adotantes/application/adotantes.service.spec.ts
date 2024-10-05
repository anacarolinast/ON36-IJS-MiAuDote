import { Test, TestingModule } from '@nestjs/testing';
import { AdotantesService } from './adotantes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Adotante } from '../domain/adotante';
import { Repository } from 'typeorm';
import { CreateAdotanteDto } from '../presenters/http/dto/create-adotante.dto';
import { UpdateAdotanteDto } from '../presenters/http/dto/update-adotante.dto';

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
        renda: 123.45,
        condicao_entrevista: 'Aprovado',
        pessoa_id: 1,
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      renda: 123.45,
      condicao_entrevista: 'Aprovado',
      pessoa_id: 1,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      renda: 123.45,
      condicao_entrevista: 'Aprovado Atualizado',
      pessoa_id: 1,
    }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdotantesService,
        {
          provide: getRepositoryToken(Adotante),
          useValue: mockAdotanteRepository,
        },
      ],
    }).compile();

    service = module.get<AdotantesService>(AdotantesService);
    repository = module.get<Repository<Adotante>>(getRepositoryToken(Adotante));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new adopter', async () => {
    const dto: CreateAdotanteDto = {
      renda: 123.45,
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

  it('should return an array of adopters', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: 1,
        renda: 123.45,
        condicao_entrevista: 'Aprovado',
        pessoa_id: 1,
      },
    ]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single adopter by ID', async () => {
    const id = 1;
    const result = await service.findOne(id);
    expect(result).toEqual({
      id,
      renda: 123.45,
      condicao_entrevista: 'Aprovado',
      pessoa_id: 1,
    });
    expect(repository.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an adopter', async () => {
    const id = 1;
    const dto: UpdateAdotanteDto = {
      renda: 123.45,
      condicao_entrevista: 'Aprovado Updated',
      pessoa_id: 1,
    };

    const result = await service.update(id, dto);
    expect(result).toEqual({
      id,
      ...dto,
    });
    expect(repository.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove an adopter', async () => {
    const id = 1;
    const result = await service.remove(id);
    expect(result).toEqual({ id });
    expect(repository.remove).toHaveBeenCalledWith({ id });
  });
});
