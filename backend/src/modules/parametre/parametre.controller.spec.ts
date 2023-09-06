import { Test, TestingModule } from '@nestjs/testing';
import { ParametreController } from './parametre.controller';

describe('ParametreController', () => {
  let controller: ParametreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParametreController],
    }).compile();

    controller = module.get<ParametreController>(ParametreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
