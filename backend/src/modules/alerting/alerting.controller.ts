import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { Alerting } from '@prisma/client';
import { AlertingService } from './alerting.service';
import { createAlertingDto } from './dto/create.alerting.dto';
import { UpdateOpexDto } from './dto/update.alerting.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
@ApiTags('alerting')
@Controller('alerting')
export class AlertingController {
    constructor(
        private alertingService: AlertingService,
    ){}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    async create(@Body() data:createAlertingDto) : Promise<Alerting>{
        
        return this.alertingService.create(data);
    }

    @Get()
    async getAll(): Promise<Alerting[]>{
        let alert = await this.alertingService.getAlert({orderBy:{typeFichier:'asc'}})

        return alert;
    }

    @Patch(':id')
    @ApiConsumes('application/x-www-form-urlencoded')
    async update(@Param('id') id:string, @Body() dto:UpdateOpexDto){
        return this.alertingService.update({where:{id:id},data:dto})
    }

    @Delete(':id')
    async delete(@Param('id') id:string): Promise<Alerting>{
        return this.alertingService.delete({where:{id:id}})
    }

}
