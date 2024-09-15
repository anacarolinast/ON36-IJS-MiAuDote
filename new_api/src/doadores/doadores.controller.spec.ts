import { Test, TestingModule } from '@nestjs/testing';
import { DoadoresController } from './doadores.controller';
import { DoadoresService } from './doadores.service';
import { CreateDoadorDto } from './dto/create-doador.dto';
import { UpdateDoadorDto } from './dto/update-doador.dto';

describe('DoadoresController', () => {
  let controller: DoadoresController;
  let service: DoadoresService;

  const mockDoadoresService = {
    findAll: jest.fn().mockResolvedValue([{
      id: 1,
      tipo_adocao: 'Adote',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      tipo_adocao: 'Adote',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    }),
    create: jest.fn().mockResolvedValue({
      id: 1,
      tipo_adocao: 'Adote',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      tipo_adocao: 'Apoie',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    }),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoadoresController],
      providers: [
        {
          provide: DoadoresService,
          useValue: mockDoadoresService,
        },
      ],
    }).compile();

    controller = module.get<DoadoresController>(DoadoresController);
    service = module.get<DoadoresService>(DoadoresService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all doadores', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{
      id: 1,
      tipo_adocao: 'Adote',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one doador by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
      id: 1,
      tipo_adocao: 'Adote',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new doador', async () => {
    const createDto: CreateDoadorDto = {
      tipo_adocao: 'Adote',
      pessoa_id: 1,
    };
    const result = await controller.create(createDto);
    expect(result).toEqual({
      id: 1,
      tipo_adocao: 'Adote',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    });
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should update a doador', async () => {
    const updateDto: UpdateDoadorDto = {
      tipo_adocao: 'Apoie',
    };
    const result = await controller.update(1, updateDto);
    expect(result).toEqual({
      id: 1,
      tipo_adocao: 'Apoie',
      pessoa_id: 1,
      pessoa: { id: 1, nome: 'João', endereco: 'Rua A' },
      doacoes: [],
    });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a doador', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
