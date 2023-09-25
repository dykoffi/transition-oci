import { Module } from '@nestjs/common';
import { ParametreService } from './parametre.service';
import { ParametreController } from './parametre.controller';
import { PrismaModule } from './../../config/prisma.module';
import { ActivityLogService } from '../activity_log/activity_log.service';

@Module({
  imports: [PrismaModule],
  providers: [ParametreService, ActivityLogService],
  controllers: [ParametreController],
})
export class ParametreModule {}
