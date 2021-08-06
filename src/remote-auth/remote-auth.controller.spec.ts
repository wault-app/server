import { Test, TestingModule } from '@nestjs/testing';
import { RemoteAuthController } from './remote-auth.controller';

describe('RemoteAuthController', () => {
  let controller: RemoteAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoteAuthController],
    }).compile();

    controller = module.get<RemoteAuthController>(RemoteAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
