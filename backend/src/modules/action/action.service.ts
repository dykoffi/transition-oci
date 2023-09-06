import { Injectable } from '@nestjs/common';
import { Action, Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { CreateActionDto } from './dto/create.action.dto';
import { ConfigService } from '@nestjs/config';
import * as minio from 'minio';

@Injectable()
export class ActionService {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async getMinioClient() {
    try {
      // Instantiate a new minio client
      let minioClient = new minio.Client({
        endPoint: this.configService.get<string>('MINIO_ENDPOINT'),
        port: parseInt(this.configService.get<string>('MINIO_PORT')),
        useSSL: false,
        accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
        secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
      });
      // Check if the bucket exists
      let existed = new Promise((resolve, reject) => {
        minioClient.bucketExists(
          this.configService.get<string>('MOBILE_BUCKETNAME'),
          function (err, exists) {
            if (err) {
              console.error(err);
              reject(err);
              return console.log(reject);
            }

            resolve(exists);
          },
        );
      });

      // If the bucket doesn't exist, create it
      if (!(await existed)) {
        minioClient.makeBucket(
          this.configService.get<string>('MOBILE_BUCKETNAME'),
          'us-east-1',
          function (err) {
            if (err) {
              return console.log(
                'Error creating bucket with object lock.',
                err,
              );
            }
            console.log(
              'Bucket created successfully in "us-east-1" and enabled object lock',
            );
          },
        );
      }

      return minioClient;
    } catch (error) {
      console.log(error);
    }
  }

  async getPresignUrl(filename: string) {
    // Get the Minio client
    let minioClient = await this.getMinioClient();
    // Create a promise to get the presigned URL
    const url = await new Promise<string>((resolve, reject) => {
      minioClient.presignedUrl(
        'GET',
        this.configService.get<string>('MOBILE_BUCKETNAME'),
        filename,
        function (err, presignedUrl) {
          if (err) return reject;
          resolve(presignedUrl);
        },
      );
    });
    // Return the presigned URL
    return url;
  }

  async create(data: CreateActionDto): Promise<Action> {
    // Extract the properties from the `createActionDto` and create an Action object
    const {
      date_deb,
      date_fin,
      localite,
      nb_rh,
      new_quartier,
      nom_action,
      partners,
      perimetre,
      quartier,
      region,
      ville,
      coords,
      performance,
    } = data;
    // Create and save the Action object using an ORM or any other data storage mechanism
    const action = await this.prisma.action.create({
      data: {
        date_deb,
        date_fin,
        localite,
        nb_rh,
        new_quartier,
        nom_action,
        partners,
        perimetre,
        quartier,
        region,
        ville,
        coords: { create: coords },
        performance: { create: performance },
      },
    });

    // Return the created Action object
    return action;
  }

  async uploadFile(id: string, files: Express.Multer.File): Promise<Action> {
    // Get the Minio client
    const minioClient = await this.getMinioClient();
    const date = new Date();
    const fileName: string = files.originalname;
    const ext = fileName.split('.');
    const folder = `${id}/action_${date.getTime()}.${ext[ext.length - 1]}`;
    try {
      const etag = await minioClient.putObject(
        this.configService.get<string>('MOBILE_BUCKETNAME'),
        folder,
        files.buffer,
      );
      const url = await this.getPresignUrl(folder);
      const action = await this.prisma.action.update({
        where: { id: id },
        data: {
          file_action: {
            create: [
              {
                etag: etag.etag,
                fileName: folder,
                url,
                size: files.size.toString(),
              },
            ],
          },
        },
      });
      return action;
    } catch (error) {
      console.error(error);
    }

  }
  async findAll(): Promise<Action[]> {
    return this.prisma.action.findMany({
      include: {
        performance: true,
        coords: true,
        file_action: true,
      },
    });
  }
  async findOne(id: string): Promise<Action | null> {
    return this.prisma.action.findUnique({ where: { id } });
  }
  async update(
    id: string,
    data: Prisma.ActionUpdateInput,
  ): Promise<Action | null> {
    return this.prisma.action.update({ where: { id }, data });
  }
  async remove(id: string): Promise<Action | null> {
    return this.prisma.action.delete({ where: { id } });
  }
}
