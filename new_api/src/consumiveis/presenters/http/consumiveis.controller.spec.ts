import { Test, TestingModule } from '@nestjs/testing';
import { ConsumiveisController } from '../../presenters/http/consumiveis.controller';
import { ConsumiveisService } from '../../application/consumiveis.service';
import { CreateConsumivelDto } from './dto/create-consumivel.dto';
import { UpdateConsumivelDto } from './dto/update-consumivel.dto';

describe('ConsumiveisController', () => {
  let controller: ConsumiveisController;
  let service: ConsumiveisService;

  const mockConsumiveisService = {
    findAll: jest.fn().mockResolvedValue([{
      id: 1,
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    }),
    create: jest.fn().mockResolvedValue({
      id: 1,
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      tipo_animal: 'Gato',
      descricao: 'Areia',
      gasto_id: 1,
    }),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumiveisController],
      providers: [
        {
          provide: ConsumiveisService,
          useValue: mockConsumiveisService,
        },
      ],
    }).compile();

    controller = module.get<ConsumiveisController>(ConsumiveisController);
    service = module.get<ConsumiveisService>(ConsumiveisService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all consumiveis', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{
      id: 1,
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one consumivel by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: 1,
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new consumivel', async () => {
    const createDto: CreateConsumivelDto = {
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    };
    const result = await controller.create(createDto);
    expect(result).toEqual({
      id: 1,
      tipo_animal: 'Cão',
      descricao: 'Ração',
      gasto_id: 1,
    });
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should update a consumivel', async () => {
    const updateDto: UpdateConsumivelDto = {
      tipo_animal: 'Gato',
      descricao: 'Areia',
    };
    const result = await controller.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      tipo_animal: 'Gato',
      descricao: 'Areia',
      gasto_id: 1,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a consumivel', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
