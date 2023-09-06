import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../config/prisma.service';
import { Parametre, Prisma } from '@prisma/client';

@Injectable()
export class ParametreService {
  constructor(private prismaService: PrismaService) {}

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
    data: Prisma.ParametreUpdateInput;
    where: Prisma.ParametreWhereUniqueInput;
  }): Promise<Parametre> {
    let param = this.prismaService.parametre.update(params);
    return param;
  }

  async delete(params: {
    where: Prisma.ParametreWhereUniqueInput;
  }): Promise<Parametre> {
    return this.prismaService.parametre.delete(params);
  }
}
