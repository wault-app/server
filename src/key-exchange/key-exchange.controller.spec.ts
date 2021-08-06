import { Test, TestingModule } from '@nestjs/testing';
import { KeyExchangeController } from './key-exchange.controller';

describe('KeyExchangeController', () => {
  let controller: KeyExchangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeyExchangeController],
    }).compile();

    controller = module.get<KeyExchangeController>(KeyExchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
