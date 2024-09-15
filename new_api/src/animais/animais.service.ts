import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimaisService {
  constructor(
    @InjectRepository(Animal)
    private readonly animaisRepository: Repository<Animal>,
  ) {}

  async findAll(): Promise<Animal[]> {
    return this.animaisRepository.find();
  }

  async findOne(id: number): Promise<Animal> {
    const animal = await this.animaisRepository.findOne({ where: { id } });
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }
    return animal;
  }

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const newAnimal = this.animaisRepository.create(createAnimalDto);
    return this.animaisRepository.save(newAnimal);
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    const animal = await this.animaisRepository.preload({
      id,
      ...updateAnimalDto,
    });
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }
    return this.animaisRepository.save(animal);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const animal = await this.findOne(id);
    await this.animaisRepository.remove(animal);
    return { deleted: true };
  }
}
