import { Test, TestingModule } from '@nestjs/testing';
import { GastosController } from './gastos.controller';
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';

describe('GastosController', () => {
  let controller: GastosController;
  let service: GastosService;

  const mockGastosService = {
    findAll: jest.fn().mockResolvedValue([{
      id: 1,
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    }),
    create: jest.fn().mockResolvedValue({
      id: 1,
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      data_gasto: new Date(),
      tipo: 'Medicamento',
      quantidade: 5,
      valor: 50.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    }),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GastosController],
      providers: [
        {
          provide: GastosService,
          useValue: mockGastosService,
        },
      ],
    }).compile();

    controller = module.get<GastosController>(GastosController);
    service = module.get<GastosService>(GastosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all gastos', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{
      id: 1,
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one gasto by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: 1,
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new gasto', async () => {
    const createDto: CreateGastoDto = {
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
    };
    const result = await controller.create(createDto);
    expect(result).toEqual({
      id: 1,
      data_gasto: new Date(),
      tipo: 'Alimento',
      quantidade: 10,
      valor: 100.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    });
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should update a gasto', async () => {
    const updateDto: UpdateGastoDto = {
      tipo: 'Medicamento',
      quantidade: 5,
      valor: 50.00,
    };
    const result = await controller.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      data_gasto: new Date(),
      tipo: 'Medicamento',
      quantidade: 5,
      valor: 50.00,
      consumivel: null,
      doacao: null,
      castracao: null,
      vacina: null,
      medicamento: null,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a gasto', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
