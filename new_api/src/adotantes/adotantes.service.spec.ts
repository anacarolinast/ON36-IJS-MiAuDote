import { Test, TestingModule } from '@nestjs/testing';
import { AdotantesService } from './adotantes.service';

describe('AdotantesService', () => {
  let service: AdotantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdotantesService],
    }).compile();

    service = module.get<AdotantesService>(AdotantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
