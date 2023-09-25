import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Alerting, Prisma } from '@prisma/client';
import { PrismaService } from './../../config/prisma.service';
import logger from '../../services/logger/logger';
import { ActivityLogService } from '../activity_log/activity_log.service';
import { UpdateOpexDto } from './dto/update.alerting.dto';

@Injectable()
export class AlertingService {
  constructor(
    private prismaService: PrismaService,
    private activitylogService: ActivityLogService,
  ) {}

  async create(dto: Prisma.AlertingCreateInput): Promise<Alerting> {
    try {
      let creation = this.prismaService.alerting.create({ data: dto });

      Logger.log('alerting ', (await creation).id, ' is created successfully');
      await logger.emit({
        level: 'info',
        type: 'HTTP',
        label: 'alerting_creation',
        message: 'alerting creation successfull',
      });
      return creation;
    } catch (error) {
      Logger.error(error);

      await logger.emit({
        level: 'error',
        type: 'HTTP',
        label: 'alerting_creation',
        message: { ùessage: 'alerting creation failed', error: error },
      });
    }
  }

  async getAlert(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AlertingWhereUniqueInput;
    where?: Prisma.AlertingWhereInput;
    orderBy?: Prisma.AlertingOrderByWithRelationInput;
  }): Promise<Alerting[]> {
    try {
      let alerts = await this.prismaService.alerting.findMany({ ...params });
      logger
        .emit({
          level: 'info',
          type: 'SYSTEM',
          code: HttpStatus.OK,
          method: 'GET',
          label: 'alerting-get',
          message: 'operation successfull',
        })
        .then((value) => console.log(value));
      return alerts;
    } catch (error) {
      Logger.error(error);

      logger
        .emit({
          level: 'error',
          type: 'SYSTEM',
          code: HttpStatus.BAD_REQUEST,
          method: 'GET',
          label: 'alerting-get',
          message: error,
        })
        .then((value) => console.log(value));
    }
  }

  async update(params: {
    data: UpdateOpexDto;
    where: Prisma.AlertingWhereUniqueInput;
  }): Promise<Alerting> {
    try {
      const { user, ...rest } = params.data;
      let alert = await this.prismaService.alerting.update({
        where: params.where,
        data: rest,
      });
      this.activitylogService.create({
        label: 'create-alert',
        level: 'info',
        code: '200',
        user: user,
        type: 'success',
      });
      logger
        .emit({
          level: 'info',
          type: 'SYSTEM',
          code: HttpStatus.OK,
          method: 'PATCH',
          label: 'alerting-update',
          message: 'operation successfull',
        })
        .then((value) => console.log(value));

      return alert;
    } catch (error) {
      Logger.error(error);

      logger
        .emit({
          level: 'error',
          type: 'SYSTEM',
          code: HttpStatus.BAD_REQUEST,
          method: 'PATCH',
          label: 'alerting-update',
          message: error,
        })
        .then((value) => console.log(value));
    }
  }

  async delete(params: {
    where: Prisma.AlertingWhereUniqueInput;
  }): Promise<Alerting> {
    try {
      let alert = await this.prismaService.alerting.delete(params);
      logger
        .emit({
          level: 'info',
          type: 'SYSTEM',
          code: HttpStatus.OK,
          method: 'DELETE',
          label: 'alerting-delete',
          message: 'operation successfull',
        })
        .then((value) => console.log(value));

      return alert;
    } catch (error) {
      Logger.error(error);

      logger
        .emit({
          level: 'error',
          type: 'SYSTEM',
          code: HttpStatus.BAD_REQUEST,
          method: 'DELETE',
          label: 'alerting-delete',
          message: error,
        })
        .then((value) => console.log(value));
    }
  }
}
