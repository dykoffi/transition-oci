import { Test, TestingModule } from '@nestjs/testing';
import { FormDataService } from './form_data.service';

describe('FormDataService', () => {
  let service: FormDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormDataService],
    }).compile();

    service = module.get<FormDataService>(FormDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
