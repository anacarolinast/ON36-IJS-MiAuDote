import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentosController } from './medicamentos.controller';
import { MedicamentosService } from './medicamentos.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

describe('MedicamentosController', () => {
  let controller: MedicamentosController;
  let service: MedicamentosService;

  const mockMedicamentosService = {
    findAll: jest.fn().mockResolvedValue([{
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }),
    create: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Vacina',
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
      controllers: [MedicamentosController],
      providers: [
        {
          provide: MedicamentosService,
          useValue: mockMedicamentosService,
        },
      ],
    }).compile();

    controller = module.get<MedicamentosController>(MedicamentosController);
    service = module.get<MedicamentosService>(MedicamentosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all medicamentos', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one medicamento by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new medicamento', async () => {
    const createDto: CreateMedicamentoDto = {
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
      veterinario_id: 1,
      gasto_id: 1,
    };
    const result = await controller.create(createDto);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Antibiótico',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    });
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should update a medicamento', async () => {
    const updateDto: UpdateMedicamentoDto = {
      descricao: 'Vacina',
    };
    const result = await controller.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Vacina',
      veterinario_id: 1,
      gasto_id: 1,
      animal: null,
      veterinario: null,
      gasto: null,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a medicamento', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
