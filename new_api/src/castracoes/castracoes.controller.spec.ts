import { Test, TestingModule } from '@nestjs/testing';
import { CastracoesController } from './castracoes.controller';
import { CastracoesService } from './castracoes.service';
import { CreateCastracaoDto } from './dto/create-castracao.dto';
import { UpdateCastracaoDto } from './dto/update-castracao.dto';

describe('CastracoesController', () => {
  let controller: CastracoesController;
  let service: CastracoesService;

  const mockCastracoesService = {
    findAll: jest.fn().mockResolvedValue([{
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
    create: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Boa',
      veterinario_id: 1,
      gasto_id: 1,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Ótima',
      veterinario_id: 1,
      gasto_id: 1,
    }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastracoesController],
      providers: [
        {
          provide: CastracoesService,
          useValue: mockCastracoesService, // Mockando o serviço
        },
      ],
    }).compile();

    controller = module.get<CastracoesController>(CastracoesController);
    service = module.get<CastracoesService>(CastracoesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all castracoes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{
      id: 1,
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Boa',
      veterinario_id: 1,
      gasto_id: 1,
    }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one castracao by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Boa',
      veterinario_id: 1,
      gasto_id: 1,
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new castracao', async () => {
    const createCastracaoDto: CreateCastracaoDto = {
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Boa',
      veterinario_id: 1,
      gasto_id: 1,
    };
    const result = await controller.create(createCastracaoDto);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Boa',
      veterinario_id: 1,
      gasto_id: 1,
    });
    expect(service.create).toHaveBeenCalledWith(createCastracaoDto);
  });

  it('should update a castracao', async () => {
    const updateCastracaoDto: UpdateCastracaoDto = {
      condicao_pos: 'Ótima',
    };
    const result = await controller.update(1, updateCastracaoDto);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_castracao: new Date('2023-09-10'),
      condicao_pos: 'Ótima',
      veterinario_id: 1,
      gasto_id: 1,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateCastracaoDto);
  });

  it('should delete a castracao', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
