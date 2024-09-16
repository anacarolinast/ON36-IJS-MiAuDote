import { Test, TestingModule } from '@nestjs/testing';
import { AnimaisController } from './animais.controller';
import { AnimaisService } from '../../application/animais.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

describe('AnimaisController', () => {
  let controller: AnimaisController;
  let service: AnimaisService;

  const mockAnimaisService = {
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        nome: 'Rex',
        especie: 'Cão',
        sexo: 'M',
        data_nascimento: new Date('2020-01-01'),
        condicao_saude: 'Saudável',
        estado_adocao: 'Disponível',
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      nome: 'Rex',
      especie: 'Cão',
      sexo: 'M',
      data_nascimento: new Date('2020-01-01'),
      condicao_saude: 'Saudável',
      estado_adocao: 'Disponível',
    }),
    create: jest.fn().mockResolvedValue({
      id: 1,
      nome: 'Rex',
      especie: 'Cão',
      sexo: 'M',
      data_nascimento: new Date('2020-01-01'),
      condicao_saude: 'Saudável',
      estado_adocao: 'Disponível',
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      nome: 'Rex',
      especie: 'Cão',
      sexo: 'M',
      data_nascimento: new Date('2020-01-01'),
      condicao_saude: 'Em tratamento',
      estado_adocao: 'Disponível',
    }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimaisController],
      providers: [
        {
          provide: AnimaisService,
          useValue: mockAnimaisService,
        },
      ],
    }).compile();

    controller = module.get<AnimaisController>(AnimaisController);
    service = module.get<AnimaisService>(AnimaisService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all animals', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      {
        id: 1,
        nome: 'Rex',
        especie: 'Cão',
        sexo: 'M',
        data_nascimento: new Date('2020-01-01'),
        condicao_saude: 'Saudável',
        estado_adocao: 'Disponível',
      },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one animal by ID', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({
      id: 1,
      nome: 'Rex',
      especie: 'Cão',
      sexo: 'M',
      data_nascimento: new Date('2020-01-01'),
      condicao_saude: 'Saudável',
      estado_adocao: 'Disponível',
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new animal', async () => {
    const dto: CreateAnimalDto = {
      nome: 'Rex',
      especie: 'Cão',
      sexo: 'M',
      data_nascimento: new Date('2020-01-01'),
      condicao_saude: 'Saudável',
      estado_adocao: 'Disponível',
    };
    const result = await controller.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should update an animal', async () => {
    const dto: UpdateAnimalDto = {
      condicao_saude: 'Em tratamento',
    };
    const result = await controller.update('1', dto);
    expect(result).toEqual({
      id: 1,
      nome: 'Rex',
      especie: 'Cão',
      sexo: 'M',
      data_nascimento: new Date('2020-01-01'),
      condicao_saude: 'Em tratamento',
      estado_adocao: 'Disponível',
    });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should remove an animal', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
