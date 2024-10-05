import { Test, TestingModule } from '@nestjs/testing';
import { CastracoesService } from './castracoes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Castracao } from '../domain/castracao';
import { Repository } from 'typeorm';
import { CreateCastracaoDto } from '../presenters/http/dto/create-castracao.dto';
import { UpdateCastracaoDto } from '../presenters/http/dto/update-castracao.dto';

describe('Testando CastracoesService', () => {
  let service: CastracoesService;
  let repository: Repository<Castracao>;

  const mockCastracaoRepository = {
    create: jest.fn().mockImplementation((dto: CreateCastracaoDto) => dto),
    save: jest.fn().mockImplementation((castracao: Castracao) =>
      Promise.resolve({
        id: Date.now(),
        ...castracao,
      })
    ),
    find: jest.fn().mockResolvedValue([
      {
        id: 1,
        animal_id: 1,
        data_castracao: new Date(),
        condicao_pos: 'Nenhuma',
        veterinario_id: 1,
        gasto_id: 1,
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_castracao: new Date(),
      condicao_pos: 'Nenhuma',
      veterinario_id: 1,
      gasto_id: 1,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 2,
      data_castracao: new Date(),
      condicao_pos: 'Updated',
      veterinario_id: 2,
      gasto_id: 2,
    }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CastracoesService,
        {
          provide: getRepositoryToken(Castracao),
          useValue: mockCastracaoRepository,
        },
      ],
    }).compile();

    service = module.get<CastracoesService>(CastracoesService);
    repository = module.get<Repository<Castracao>>(getRepositoryToken(Castracao));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new castration', async () => {
    const dto: CreateCastracaoDto = {
      animal_id: 1,
      data_castracao: new Date(),
      condicao_pos: 'Nenhuma',
      veterinario_id: 1,
      gasto_id: 1,
    };

    const result = await service.create(dto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(dto);
  });

  it('should return an array of castrations', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: 1,
        animal_id: 1,
        data_castracao: new Date(),
        condicao_pos: 'Nenhuma',
        veterinario_id: 1,
        gasto_id: 1,
      },
    ]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single castration by ID', async () => {
    const id = 1;
    const result = await service.findOne(id);
    expect(result).toEqual({
      id,
      animal_id: 1,
      data_castracao: new Date(),
      condicao_pos: 'Nenhuma',
      veterinario_id: 1,
      gasto_id: 1,
    });
    expect(repository.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an castration', async () => {
    const id = 1;
    const dto: UpdateCastracaoDto = {
      animal_id: 2,
      data_castracao: new Date(),
      condicao_pos: 'Updated',
      veterinario_id: 2,
      gasto_id: 2,
    };

    const result = await service.update(id, dto);
    expect(result).toEqual({
      id,
      ...dto,
    });
    expect(repository.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove an castration', async () => {
    const id = 1;
    const result = await service.remove(id);
    expect(result).toEqual({ id });
    expect(repository.remove).toHaveBeenCalledWith({ id });
  });
});
