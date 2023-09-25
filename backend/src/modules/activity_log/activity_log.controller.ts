import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ActivityLogService } from './activity_log.service';
import { ActivityLog } from '@prisma/client';
import { CreateACtivityLogDto } from './dto/create.activitylog.dto';
import { UpdateACtivityLogDto } from './dto/update.activitylog.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Activity Log')
@Controller('activitylog')
export class ActivityLogController {
  constructor(private activityLogService: ActivityLogService) {}

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateACtivityLogDto,
  ): Promise<ActivityLog> {
    let param = await this.activityLogService.create(dto);
    return param;
  }

  @Get()
  async getAll(): Promise<ActivityLog[]> {
    let param = await this.activityLogService.getActivityLog({
      orderBy: { label: 'asc' },
    });
    return param;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateACtivityLogDto) {
    return this.activityLogService.update({ where: { id: id }, data: dto });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ActivityLog> {
    return this.activityLogService.delete({ where: { id: id } });
  }
}
