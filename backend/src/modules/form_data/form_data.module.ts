import { Module } from '@nestjs/common';
import { FormDataController } from './form_data.controller';
import { FormDataService } from './form_data.service';

@Module({
  controllers: [FormDataController],
  providers: [FormDataService]
})
export class FormDataModule {}
