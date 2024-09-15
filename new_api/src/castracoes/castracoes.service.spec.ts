import { Test, TestingModule } from '@nestjs/testing';
import { CastracoesService } from './castracoes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Castracao } from './entities/castracao.entity';
import { Repository } from 'typeorm';

describe('CastracoesService', () => {
  let service: CastracoesService;
  let repository: Repository<Castracao>;

  // Mock para o Repositório de Castrações
  const mockCastracoesRepository = {
    find: jest.fn().mockResolvedValue([{
      id: 1,
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Boa',
      veterinario_id: 1,
      gasto_id: 1,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Boa',
      veterinario_id: 1,
      gasto_id: 1,
    }),
    save: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Boa',
      veterinario_id: 1,
      gasto_id: 1,
    }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CastracoesService,
        {
          provide: getRepositoryToken(Castracao),
          useValue: mockCastracoesRepository, // Mockando o repositório
        },
      ],
    }).compile();

    service = module.get<CastracoesService>(CastracoesService);
    repository = module.get<Repository<Castracao>>(getRepositoryToken(Castracao));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all castracoes', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{
      id: 1,
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Boa',
      veterinario_id: 1,
      gasto_id: 1,
    }]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return one castracao by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Boa',
      veterinario_id: 1,
      gasto_id: 1,
    });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should create a new castracao', async () => {
    const newCastracao = {
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Boa',
      veterinario_id: 1,
      gasto_id: 1,
    };
    const result = await service.create(newCastracao);
    expect(result).toEqual({ id: 1, ...newCastracao });
    expect(repository.save).toHaveBeenCalledWith(newCastracao);
  });

  it('should update a castracao', async () => {
    const updatedCastracao = {
      condicao_pos: 'Ótima',
    };
    const result = await service.update(1, updatedCastracao);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Ótima',
      veterinario_id: 1,
      gasto_id: 1,
    });
    expect(repository.save).toHaveBeenCalledWith({ id: 1, ...updatedCastracao });
  });

  it('should delete a castracao', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1 });
  });
});
