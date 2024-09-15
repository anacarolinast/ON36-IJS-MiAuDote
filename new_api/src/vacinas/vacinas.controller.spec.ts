import { Test, TestingModule } from '@nestjs/testing';
import { VacinasController } from './vacinas.controller';
import { VacinasService } from './vacinas.service';
import { CreateVacinaDto } from './dto/create-vacina.dto';
import { UpdateVacinaDto } from './dto/update-vacina.dto';

describe('VacinasController', () => {
  let controller: VacinasController;
  let service: VacinasService;

  const mockVacinasService = {
    findAll: jest.fn().mockResolvedValue([{
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }),
    create: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina B',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacinasController],
      providers: [
        {
          provide: VacinasService,
          useValue: mockVacinasService,
        },
      ],
    }).compile();

    controller = module.get<VacinasController>(VacinasController);
    service = module.get<VacinasService>(VacinasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all vacinas', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one vacina by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new vacina', async () => {
    const createDto: CreateVacinaDto = {
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
    };
    const result = await controller.create(createDto);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina A',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    });
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should update a vacina', async () => {
    const updateDto: UpdateVacinaDto = {
      tipo_vacina: 'Vacina B',
    };
    const result = await controller.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_vacinacao: new Date(),
      tipo_vacina: 'Vacina B',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a vacina', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
