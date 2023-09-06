import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

  async create(dto: Prisma.UserCreateInput): Promise<User> {
    let param = this.prismaService.user.create({ data: dto });
    return param;
  }

  async getUser(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return this.prismaService.user.findMany({ ...params });
  }

  async findOne(params: {
    where: Prisma.UserWhereUniqueInput;
  }) : Promise<User> {
    let user = this.prismaService.user.findUnique({...params});

    return user;
  }

  async update(params: {
    data: Prisma.UserUpdateInput;
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    let param = this.prismaService.user.update(params);
    return param;
  }

  async delete(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    return this.prismaService.user.delete(params);
  }
}
