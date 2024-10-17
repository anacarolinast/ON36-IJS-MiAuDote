import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { VeterinariosService } from '../../application/veterinarios.service'; 
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto'; 
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('veterinarios')
@ApiTags('Veterinários')
export class VeterinariosController {
  constructor(private readonly veterinariosService: VeterinariosService) {}

  @Get()
  @ApiOperation({ summary: "Rota responsável por obter todos os registros disponíveis em vacinas."})
  async findAll() {
    return this.veterinariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Rota responsável por obter um registro em vacinas com uma id especifica."})
  async findOne(@Param('id') id: number) {
    return this.veterinariosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Rota responsável por criar um novo registro em vacinas."})
  async create(@Body() createVeterinarioDto: CreateVeterinarioDto) {
    return this.veterinariosService.create(createVeterinarioDto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Rota responsável por atualizar um registro em vacinas."})
  async update(
    @Param('id') id: number,
    @Body() updateVeterinarioDto: UpdateVeterinarioDto,
  ) {
    return this.veterinariosService.update(id, updateVeterinarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Rota responsável por remover um registro em vacinas."})
  async remove(@Param('id') id: number) {
    return this.veterinariosService.remove(id);
  }
}
