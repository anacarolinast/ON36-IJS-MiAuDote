import { Injectable } from '@nestjs/common';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';

@Injectable()
export class VeterinariosService {
  create(createVeterinarioDto: CreateVeterinarioDto) {
    return 'This action adds a new veterinario';
  }

  findAll() {
    return `This action returns all veterinarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} veterinario`;
  }

  update(id: number, updateVeterinarioDto: UpdateVeterinarioDto) {
    return `This action updates a #${id} veterinario`;
  }

  remove(id: number) {
    return `This action removes a #${id} veterinario`;
  }
}
