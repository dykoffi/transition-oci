import { Test, TestingModule } from '@nestjs/testing';
import { FormDataController } from './form_data.controller';

describe('FormDataController', () => {
  let controller: FormDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormDataController],
    }).compile();

    controller = module.get<FormDataController>(FormDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
