import { Test, TestingModule } from '@nestjs/testing';
import { FileuserController } from './fileuser.controller';

describe('FileuserController', () => {
  let controller: FileuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileuserController],
    }).compile();

    controller = module.get<FileuserController>(FileuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
