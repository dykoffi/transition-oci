import { Module } from '@nestjs/common';
import { FileUserService } from './fileuser.service';
import { FileuserController } from './fileuser.controller';
import { PrismaModule } from './../../config/prisma.module';

@Module({
  imports: [PrismaModule],
providers: [FileUserService],
  controllers: [FileuserController]
})
export class FileUserModule {}
