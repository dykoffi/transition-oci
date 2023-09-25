import { Module } from '@nestjs/common';
import { AlertingService } from './alerting.service';
import { AlertingController } from './alerting.controller';
import { PrismaModule } from './../../config/prisma.module';
import { ActivityLogService } from '../activity_log/activity_log.service';

@Module({
  imports:[PrismaModule],
  providers: [AlertingService,ActivityLogService],
  controllers: [AlertingController]
})
export class AlertingModule {}
