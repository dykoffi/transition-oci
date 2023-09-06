import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create.user.dto';
import { User } from '@prisma/client';
import { updateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post()
    async create(@Body(ValidationPipe) dto:createUserDto): Promise<User> {
        let param = await this.userService.create(dto)
        return param;
    }

    @Get()
    async getAll(): Promise<User[]>{
        let param = await this.userService.getUser({})
        return param;
    }

    @Patch(':id')
    async update(@Param('id') id:string, @Body() dto:updateUserDto){
        return this.userService.update({where:{id:id},data:dto})
    }

    @Delete(':id')
    async delete(@Param('id') id:string): Promise<User>{
        return this.userService.delete({where:{id:id}})
    }
}
