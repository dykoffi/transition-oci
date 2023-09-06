import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { FileUserModule } from '../fileuser/fileuser.module';
import { FileUserService } from '../fileuser/fileuser.service';
import { PrismaModule } from './../../config/prisma.module';

@Module({
  imports:[FileUserModule,PrismaModule],
  controllers: [MinioController],
  providers: [MinioService, FileUserService]
})
export class MinioModule {}
