import { Test, TestingModule } from '@nestjs/testing';
import { AnimaisService } from './animais.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Repository } from 'typeorm';

describe('AnimaisService', () => {
  let service: AnimaisService;
  let repository: Repository<Animal>;

  const mockAnimaisRepository = {
    find: jest.fn().mockResolvedValue([{
      id: 1, 
      nome: 'Rex', 
      especie: 'Cão', 
      sexo: 'M', 
      data_nascimento: new Date('2020-01-01'), 
      condicao_saude: 'Saudável', 
      estado_adocao: 'Disponível'
    }]),
    findOne: jest.fn().mockResolvedValue({
      id: 1, 
      nome: 'Rex', 
      especie: 'Cão', 
      sexo: 'M', 
      data_nascimento: new Date('2020-01-01'), 
      condicao_saude: 'Saudável', 
      estado_adocao: 'Disponível'
    }),
    save: jest.fn().mockResolvedValue({
      id: 1, 
      nome: 'Rex', 
      especie: 'Cão', 
      sexo: 'M', 
      data_nascimento: new Date('2020-01-01'), 
      condicao_saude: 'Saudável', 
      estado_adocao: 'Disponível'
    }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimaisService,
        {
          provide: getRepositoryToken(Animal),
          useValue: mockAnimaisRepository, 
        },
      ],
    }).compile();

    service = module.get<AnimaisService>(AnimaisService);
    repository = module.get<Repository<Animal>>(getRepositoryToken(Animal));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all animals', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{
      id: 1, 
      nome: 'Rex', 
      especie: 'Cão', 
      sexo: 'M', 
      data_nascimento: new Date('2020-01-01'), 
      condicao_saude: 'Saudável', 
      estado_adocao: 'Disponível'
    }]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return one animal by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1, 
      nome: 'Rex', 
      especie: 'Cão', 
      sexo: 'M', 
      data_nascimento: new Date('2020-01-01'), 
      condicao_saude: 'Saudável', 
      estado_adocao: 'Disponível'
    });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should create a new animal', async () => {
    const newAnimal = {
      nome: 'Rex', 
      especie: 'Cão', 
      sexo: 'M', 
      data_nascimento: new Date('2020-01-01'), 
      condicao_saude: 'Saudável', 
      estado_adocao: 'Disponível',
    };
    const result = await service.create(newAnimal);
    expect(result).toEqual({ id: 1, ...newAnimal });
    expect(repository.save).toHaveBeenCalledWith(newAnimal);
  });

  it('should update an animal', async () => {
    const updatedAnimal = {
      condicao_saude: 'Em tratamento',
    };
    const result = await service.update(1, updatedAnimal);
    expect(result).toEqual({
      id: 1, 
      nome: 'Rex', 
      especie: 'Cão', 
      sexo: 'M', 
      data_nascimento: new Date('2020-01-01'), 
      condicao_saude: 'Em tratamento', 
      estado_adocao: 'Disponível'
    });
    expect(repository.save).toHaveBeenCalledWith({ id: 1, ...updatedAnimal });
  });

  it('should delete an animal', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1 });
  });
});
