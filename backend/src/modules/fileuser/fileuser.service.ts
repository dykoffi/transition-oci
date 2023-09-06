import { Injectable } from '@nestjs/common';
import { FileUser, Prisma } from '@prisma/client';
import { PrismaService } from './../../config/prisma.service';

@Injectable()
export class FileUserService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: Prisma.FileUserCreateInput): Promise<FileUser> {
    let fileUser = await this.prismaService.fileUser.create({ data: dto });

    return fileUser;
  }

  get(dto: Prisma.FileUserWhereInput): Promise<FileUser> {
    return this.prismaService.fileUser.findFirst({ where: dto });
  }

  async upload(
    id: string,
    data: Prisma.FileUserUpdateInput,
  ): Promise<FileUser> {
    let fileUser = await this.prismaService.fileUser.update({
      where: { id: id },
      data: data,
    });

    return fileUser;
  }

  getAll() {
    return this.prismaService.fileUser.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getFileUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FileUserWhereUniqueInput;
    where?: Prisma.FileUserWhereInput;
    orderBy?: Prisma.FileUserOrderByWithRelationInput;
  }): Promise<FileUser[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.fileUser.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
