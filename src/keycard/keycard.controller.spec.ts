import { Test, TestingModule } from '@nestjs/testing';
import { KeycardController } from './keycard.controller';

describe('KeycardController', () => {
  let controller: KeycardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeycardController],
    }).compile();

    controller = module.get<KeycardController>(KeycardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
