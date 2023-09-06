import { Module } from '@nestjs/common';
import { AlertingService } from './alerting.service';
import { AlertingController } from './alerting.controller';
import { PrismaModule } from './../../config/prisma.module';

@Module({
  imports:[PrismaModule],
  providers: [AlertingService],
  controllers: [AlertingController]
})
export class AlertingModule {}
