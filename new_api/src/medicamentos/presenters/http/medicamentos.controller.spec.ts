import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentosController } from '../../presenters/http/medicamentos.controller';
import { MedicamentosService } from '../../application/medicamentos.service';
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
      descricao: 'Bravecto',
      veterinario_id: 1,
      gasto_id: 1,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto',
      veterinario_id: 1,
      gasto_id: 1,
    }),
    create: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto',
      veterinario_id: 1,
      gasto_id: 1,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto Updated',
      veterinario_id: 1,
      gasto_id: 1,
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
      descricao: 'Bravecto',
      veterinario_id: 1,
      gasto_id: 1,
    }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one medicamento by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto',
      veterinario_id: 1,
      gasto_id: 1,
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new medicamento', async () => {
    const createDto: CreateMedicamentoDto = {
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto',
      veterinario_id: 1,
      gasto_id: 1,
    };
    const result = await controller.create(createDto);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto',
      veterinario_id: 1,
      gasto_id: 1,
    });
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should update a medicamento', async () => {
    const updateDto: UpdateMedicamentoDto = {
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto Updated',
      veterinario_id: 1,
      gasto_id: 1,
    };
    const result = await controller.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      animal_id: 1,
      data_compra: new Date(),
      descricao: 'Bravecto',
      veterinario_id: 1,
      gasto_id: 1,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a medicamento', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
