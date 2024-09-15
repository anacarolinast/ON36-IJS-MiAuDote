import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Veterinario } from './entities/veterinario.entity';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';

@Injectable()
export class VeterinariosService {
  constructor(
    @InjectRepository(Veterinario)
    private readonly veterinarioRepository: Repository<Veterinario>,
  ) {}

  async findAll(): Promise<Veterinario[]> {
    return this.veterinarioRepository.find();
  }

  async findOne(id: number): Promise<Veterinario> {
    const veterinario = await this.veterinarioRepository.findOne({ where: { id } });
    if (!veterinario) {
      throw new NotFoundException(`Veterinário com ID ${id} não encontrado`);
    }
    return veterinario;
  }

  async create(createVeterinarioDto: CreateVeterinarioDto): Promise<Veterinario> {
    const veterinario = this.veterinarioRepository.create(createVeterinarioDto);
    return this.veterinarioRepository.save(veterinario);
  }

  async update(id: number, updateVeterinarioDto: UpdateVeterinarioDto): Promise<Veterinario> {
    const veterinario = await this.findOne(id);
    Object.assign(veterinario, updateVeterinarioDto);
    return this.veterinarioRepository.save(veterinario);
  }

  async remove(id: number): Promise<{ affected: number }> {
    const result: DeleteResult = await this.veterinarioRepository.delete(id);

    if (result.affected === undefined) {
      throw new Error('A propriedade "affected" está indefinida');
    }

    if (result.affected === 0) {
      throw new NotFoundException(`Veterinário com ID ${id} não encontrado`);
    }

    return { affected: result.affected };
  }
}
