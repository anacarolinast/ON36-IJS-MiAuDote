import { Test, TestingModule } from '@nestjs/testing';
import { DoacoesController } from '../../presenters/http/doacoes.controller';
import { DoacoesService } from '../../application/doacoes.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';

describe('DoacoesController', () => {
  let controller: DoacoesController;
  let service: DoacoesService;

  const mockDoacoesService = {
    findAll: jest.fn().mockResolvedValue([{
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Material',
      valor_estimado: -123.45,
      gasto_id: 1,
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Material',
      valor_estimado: -123.45,
      gasto_id: 1,
    }),
    create: jest.fn().mockResolvedValue({
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Material',
      valor_estimado: -123.45,
      gasto_id: 1,
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Material',
      valor_estimado: -123.45,
      gasto_id: 1,
    }),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoacoesController],
      providers: [
        {
          provide: DoacoesService,
          useValue: mockDoacoesService,
        },
      ],
    }).compile();

    controller = module.get<DoacoesController>(DoacoesController);
    service = module.get<DoacoesService>(DoacoesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all doacoes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Material',
      valor_estimado: -123.45,
      gasto_id: 1,
    }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one doacao by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Material',
      valor_estimado: -123.45,
      gasto_id: 1,
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new doacao', async () => {
    const createDto: CreateDoacaoDto = {
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Material',
      valor_estimado: -123.45,
      gasto_id: 1,
    };
    const result = await controller.create(createDto);
    expect(result).toEqual({
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Material',
      valor_estimado: -123.45,
      gasto_id: 1,
    });
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should update a doacao', async () => {
    const updateDto: UpdateDoacaoDto = {
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Dinheiro',
      valor_estimado: -123.45,
      gasto_id: 1,
    };
    const result = await controller.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      doador_id: 1,
      data_doacao: new Date(),
      tipo_doacao: 'Material',
      valor_estimado: -123.45,
      gasto_id: 1,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a doacao', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
