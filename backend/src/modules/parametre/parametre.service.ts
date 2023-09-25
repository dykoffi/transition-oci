import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './../../config/prisma.service';
import { Parametre, Prisma } from '@prisma/client';
import { UpdateParametreDto } from './dto/update.parametre.dto';
import { ActivityLogService } from '../activity_log/activity_log.service';

@Injectable()
export class ParametreService {
  constructor(
    private prismaService: PrismaService,
    private activitylogService: ActivityLogService,
  ) {}

  async create(dto: Prisma.ParametreCreateInput): Promise<Parametre> {
    let param = this.prismaService.parametre.create({ data: dto });
    return param;
  }

  async getParametre(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ParametreWhereUniqueInput;
    where?: Prisma.ParametreWhereInput;
    orderBy?: Prisma.ParametreOrderByWithRelationInput;
  }): Promise<Parametre[]> {
    return this.prismaService.parametre.findMany({ ...params });
  }

  async update(params: {
    data: UpdateParametreDto;
    where: Prisma.ParametreWhereUniqueInput;
  }): Promise<Parametre> {
    const { user, ...rest } = params.data;

    try {
      let param = await this.prismaService.parametre.update({
        where: params.where,
        data: rest,
      });

      await this.activitylogService.create({
        level: 'info',
        label: 'update-parametre',
        code: '200',
        type: 'success',
        user: user,
      });
      return param;
    } catch (error) {
      Logger.error(error);
      await this.activitylogService.create({
        level: 'error',
        label: 'update-parametre',
        code: '500',
        type: 'error',
        user: user,
      });
    }
  }

  async delete(params: {
    where: Prisma.ParametreWhereUniqueInput;
  }): Promise<Parametre> {
    return this.prismaService.parametre.delete(params);
  }
}
