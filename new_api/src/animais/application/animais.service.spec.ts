import { Test, TestingModule } from '@nestjs/testing';
import { AnimaisService } from './animais.service';
import { CreateAnimalDto } from '../presenters/http/dto/create-animal.dto'; 
import { Animal } from '../domain/animal';
import { AnimalFactory } from '../domain/factories/animais-factory'; 
import { AnimalRepository } from './ports/animais.repository';  
import { UpdateAnimalDto } from '../presenters/http/dto/update-animal.dto';
import { NotFoundException } from '@nestjs/common';

describe('AnimaisService', () => {
  let service: AnimaisService;
  let animalFactory: AnimalFactory;
  let animalRepository: AnimalRepository;

  const createAnimalDto: CreateAnimalDto = {
    nome: 'Leão',
    especie: 'Felino',
    sexo: 'Macho',
    data_nascimento: new Date(2019, 1, 1),
    condicao_saude: 'Saudável',
    estado_adocao: 'Disponível',
  };

  const updateAnimalDto: UpdateAnimalDto = {
    nome: 'Leão Atualizado',
    especie: 'Felino',
    sexo: 'Macho',
    data_nascimento: new Date(2019, 1, 1),
    condicao_saude: 'Bom',
    estado_adocao: 'Adotado',
  };

  const animal: Animal = new Animal(
    1,
    'Leão',
    'Felino',
    'Macho',
    new Date(2019, 1, 1),
    'Saudável',
    'Disponível'
  );

  beforeEach(async () => {
    animalFactory = {
      create: jest.fn().mockImplementation((data) => {
        return new Animal(
          1, 
          data.nome,
          data.especie,
          data.sexo,
          data.data_nascimento,
          data.condicao_saude,
          data.estado_adocao,
        );
      }),
    };

    animalRepository = {
      save: jest.fn().mockImplementation((animal: Animal) => Promise.resolve(animal)),
      findAll: jest.fn().mockResolvedValue([animal]),
      findById: jest.fn().mockResolvedValue(animal),
      update: jest.fn().mockResolvedValue(animal),
      remove: jest.fn().mockResolvedValue(undefined),
    } as unknown as AnimalRepository;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimaisService,
        { provide: AnimalFactory, useValue: animalFactory },
        { provide: AnimalRepository, useValue: animalRepository },
      ],
    }).compile();

    service = module.get<AnimaisService>(AnimaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an animal', async () => {
    const createdAnimal = await service.create(createAnimalDto);
    expect(createdAnimal).toBeInstanceOf(Animal);
    expect(createdAnimal.nome).toBe(createAnimalDto.nome);
    expect(animalRepository.save).toHaveBeenCalledWith(expect.any(Animal));
  });

  it('should return all animals', async () => {
    const animals = await service.findAll();
    expect(animals).toHaveLength(1);
    expect(animals[0]).toBeInstanceOf(Animal);
    expect(animals[0].nome).toBe(animal.nome);
  });

  it('should return an animal by ID', async () => {
    const foundAnimal = await service.findOne(1);
    expect(foundAnimal).toBeInstanceOf(Animal);
    expect(foundAnimal.id).toBe(1);
    expect(foundAnimal.nome).toBe(animal.nome);
  });

  it('should throw an exception if the animal is not found', async () => {
    animalRepository.findById = jest.fn().mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update an existing animal', async () => {
    const updatedAnimal = await service.update(1, updateAnimalDto);
    expect(updatedAnimal).toBeInstanceOf(Animal);
    expect(updatedAnimal.nome).toBe(updateAnimalDto.nome);
    expect(animalRepository.update).toHaveBeenCalledWith(1, expect.any(Animal));
  });

  it('should remove an existing animal', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(animalRepository.remove).toHaveBeenCalledWith(1);
  });
});
