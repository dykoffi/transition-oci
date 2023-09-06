import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ParametreService } from './parametre.service';
import { Parametre } from '@prisma/client';
import { createParametreDto } from './dto/create.parametre.dto';
import { updateParametreDto } from './dto/update.parametre.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('parametre')
@Controller('parametre')
export class ParametreController {
    constructor(
        private parametreService: ParametreService
    ){}

    @Post()
    async create(@Body(ValidationPipe) dto:createParametreDto): Promise<Parametre> {
        let param = await this.parametreService.create(dto)
        return param;
    }

    @Get()
    async getAll(): Promise<Parametre[]>{
        let param = await this.parametreService.getParametre({orderBy:{label:'asc'}})
        return param;
    }

    @Patch(':id')
    async update(@Param('id') id:string, @Body() dto:updateParametreDto){
        return this.parametreService.update({where:{id:id},data:dto})
    }

    @Delete(':id')
    async delete(@Param('id') id:string): Promise<Parametre>{
        return this.parametreService.delete({where:{id:id}})
    }
}
