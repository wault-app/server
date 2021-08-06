import { Test, TestingModule } from '@nestjs/testing';
import { KeyExchangeService } from './key-exchange.service';

describe('KeyExchangeService', () => {
  let service: KeyExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyExchangeService],
    }).compile();

    service = module.get<KeyExchangeService>(KeyExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
