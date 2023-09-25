import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../config/prisma.service';
import { ActivityLog, Prisma } from '@prisma/client';

@Injectable()
export class ActivityLogService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: Prisma.ActivityLogCreateInput): Promise<ActivityLog> {
    let activity = this.prismaService.activityLog.create({ data: dto });
    return activity;
  }

  async getActivityLog(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActivityLogWhereUniqueInput;
    where?: Prisma.ActivityLogWhereInput;
    orderBy?: Prisma.ActivityLogOrderByWithRelationInput;
  }): Promise<ActivityLog[]> {
    return this.prismaService.activityLog.findMany({ ...params });
  }

  async update(params: {
    data: Prisma.ActivityLogUpdateInput;
    where: Prisma.ActivityLogWhereUniqueInput;
  }): Promise<ActivityLog> {
    let activity = this.prismaService.activityLog.update(params);
    return activity;
  }

  async delete(params: {
    where: Prisma.ActivityLogWhereUniqueInput;
  }): Promise<ActivityLog> {
    return this.prismaService.activityLog.delete(params);
  }
}
