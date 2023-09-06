import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Res, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import { Response } from 'express';
import { FileRegisterDto } from './dto/file.register.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';


@ApiTags('minio')
@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiConsumes('application/x-www-form-urlencoded')
  
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Body() dto:FileRegisterDto, @UploadedFile() file: Express.Multer.File,@Res() res: Response) {
    let upload  = await this.minioService.uploadFile(dto,file);
    res.status(HttpStatus.OK).send(upload);
    return upload;
    
    
  }

  @Get('list')
  async listFile() : Promise<any> {
    return this.minioService.listObject();
  }
}
