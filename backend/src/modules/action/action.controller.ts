import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Action, Prisma } from '@prisma/client';
import { ActionService } from './action.service';
import { CreateActionDto } from './dto/create.action.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
@ApiTags('actions')
@Controller('actions')
export class ActionController {

  constructor(private readonly actionService: ActionService) {}

  @Post()
  create(@Body() data: CreateActionDto): Promise<Action> {
    console.log(data);
        
    return this.actionService.create(data);
  }

  @Put('files/:id')
  @ApiConsumes('multipart/form-data')
  @ApiConsumes('application/x-www-form-urlencoded')
  @UseInterceptors(FileInterceptor('files'))
  insertImage(@Param('id') id: string,@UploadedFile() files: Express.Multer.File):  Promise<Action> {
    console.log('yuvkybbkunyu');
    
    console.log('files',files);
    return this.actionService.uploadFile(id,files);
  }

  @Get()
  findAll(): Promise<Action[]> {
    return this.actionService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Action | null> {
    return this.actionService.findOne(id);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.ActionUpdateInput,
  ): Promise<Action | null> {
    return this.actionService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Action | null> {
    return this.actionService.remove(id);
  }
}
