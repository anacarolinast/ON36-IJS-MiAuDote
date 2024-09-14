import { Test, TestingModule } from '@nestjs/testing';
import { DoadoresService } from './doadores.service';

describe('DoadoresService', () => {
  let service: DoadoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoadoresService],
    }).compile();

    service = module.get<DoadoresService>(DoadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
