import { Module } from '@nestjs/common';
import { ActivityLogController } from './activity_log.controller';
import { ActivityLogService } from './activity_log.service';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [ActivityLogController],
  providers: [ActivityLogService,PrismaService]
})
export class ActivityLogModule {}
