import { Controller, Post, Get } from '@nestjs/common';
import { FileUser } from '@prisma/client';
import { CreateFileUserDto } from './dto/create.fileuser.dto';
import { FileUserService } from './fileuser.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
@ApiTags('fileuser')
@Controller('fileuser')
export class FileuserController {
    constructor(private fileuserService: FileUserService){}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    create(dto:CreateFileUserDto) : Promise<FileUser>{
        return this.fileuserService.create(dto);
    }

    @Get()
    getAll(): Promise<FileUser[]>{
        return this.fileuserService.getFileUsers({});
    }

}
