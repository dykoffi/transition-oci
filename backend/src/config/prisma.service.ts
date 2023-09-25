import { PrismaClient } from '.prisma/client';
import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import logger from '../services/logger/logger';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    const url = config.get<string>('DATABASE_URL');

    super({
      datasources: {
        db: {
          url,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      logger
        .emit({
          level: 'info',
          type: 'SYSTEM',
          label: 'prisma_db_connection',
          message: 'database connected',
        })
        .then((value) => console.log(value));
    } catch (error) {
      logger
        .emit({
          level: 'error',
          type: 'SYSTEM',
          label: 'prisma_db_connection',
          message: error,
        })
        .then((value) => console.log(value));
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }


}
