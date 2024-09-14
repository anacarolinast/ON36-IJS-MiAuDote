import { Test, TestingModule } from '@nestjs/testing';
import { VeterinariosController } from './veterinarios.controller';
import { VeterinariosService } from './veterinarios.service';

describe('VeterinariosController', () => {
  let controller: VeterinariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeterinariosController],
      providers: [VeterinariosService],
    }).compile();

    controller = module.get<VeterinariosController>(VeterinariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
