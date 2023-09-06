import { Module } from '@nestjs/common';
import { ParametreService } from './parametre.service';
import { ParametreController } from './parametre.controller';
import { PrismaModule } from './../../config/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ParametreService],
  controllers: [ParametreController],
})
export class ParametreModule {}
