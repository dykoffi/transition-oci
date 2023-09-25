import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as minio from 'minio';
import { FileValidator } from './../../services/file.validator.service';
import { IUploadFileResponse } from './../../interfaces/uploadFileResponse';
import { FileUserService } from './../fileuser/fileuser.service';
import logger from './../../services/logger/logger';
import { ActivityLogService } from '../activity_log/activity_log.service';

interface Dto {
  folder: string;
  user_id: string;
  date_range: string;
}
interface GetObjectResponse {
  name: string;
  etag: string;
  lastModified: string;
}
@Injectable()
export class MinioService {
  constructor(
    private configService: ConfigService,
    private fileUserService: FileUserService,
    private activityLogService: ActivityLogService,
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
          this.configService.get<string>('MINIO_BUCKETNAME'),
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
          this.configService.get<string>('MINIO_BUCKETNAME'),
          'us-east-1',
          function (err) {
            if (err) {
              logger
                .emit({
                  level: 'error',
                  type: 'SYSTEM',
                  label: 'minio_bucket_creation',
                  message: {
                    message: 'Error creating bucket with object lock.',
                    error: err,
                  },
                })
                .then((value) => console.log(value));
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
      // Emit log with info level, type SYSTEM, label minio_bucket_creation and message to fluend
      logger
        .emit({
          level: 'info',
          type: 'SYSTEM',
          label: 'minio_bucket_creation',
          message:
            'Bucket created successfully in us-east-1 and enabled object loc',
        })
        // Log the value returned by the promise
        .then((value) => console.log(value));

      return minioClient;
    } catch (error) {
      logger
        .emit({
          level: 'error',
          type: 'SYSTEM',
          label: 'minio_client',
          message: { message: 'Error instantiate minio client.', error: error },
        })
        .then((value) => console.log(value));
    }
  }

  async uploadFile(dto: Dto, file: any): Promise<IUploadFileResponse> {
    let result: IUploadFileResponse;

    // Get the Minio client
    let minioClient = await this.getMinioClient();

    try {
      // Get the file name
      let file_name: string = file.originalname;
      // Validate the file
      let validator = FileValidator(dto.folder, file);

      if ((await validator).state) {
        // Parse the date range
        let date_range = JSON.parse(dto.date_range);
        console.log('date_range', date_range);
        // Format the date range
        let date_final: string;
        if (date_range.length == 1) {
          date_final =
            date_range[0].year.toString() + date_range[0].month.toString();
        } else {
          date_final =
            date_range[0].year.toString() +
            date_range[0].month.toString() +
            '-' +
            date_range.slice(-1)[0].year.toString() +
            date_range.slice(-1)[0].month.toString();
        }
        // Get the file extension
        let ext = file_name.split('.');
        const folder =
          dto.folder +
          '/' +
          dto.folder +
          '_' +
          date_final +
          '.' +
          ext.slice(-1);

        const etag = await minioClient.putObject(
          this.configService.get<string>('MINIO_BUCKETNAME'),
          folder,
          file.buffer,
        );

        const url = await this.getPresignUrl(folder);

        this.fileUserService.create({
          name: folder,
          url: url,
          fileEtag: etag.etag,
          userId: dto.user_id,
        });
        this.activityLogService.create({
          label: 'upload-file',
          level: 'info',
          user: dto.user_id,
          code: '200',
          type: 'success',
        });

        // Return the success response
        result = {
          status: HttpStatus.OK,
          message: 'Le fichier a été validé avec succès.',
          errors: null,
        };
        return result;
      } else {
        this.activityLogService.create({
          label: 'upload-file-validation-fails',
          level: 'info',
          user: dto.user_id,
          code: '200',
          type: 'error',
        });
        // Return the validation failed response
        result = {
          status: HttpStatus.OK,
          message: 'La validation du fichier a échoué',
          errors: (await validator).errors,
        };
        return result;
      }
    } catch (error) {
      console.error(error);
      this.activityLogService.create({
        label: 'upload-file-fails',
        level: 'error',
        user: dto.user_id,
        code: '500',
        type: 'error',
      });
      logger
        .emit({
          level: 'error',
          type: 'SYSTEM',
          label: 'minio_upload_file',
          message: { message: 'Something bad happened', error: error },
        })
        .then((value) => console.log(value));
      throw new BadRequestException('Something bad happened');
    }
  }

  async getObject(filename: string): Promise<GetObjectResponse> {
    // Get Minio Client
    let minioClient = await this.getMinioClient();
    // Initialize object to return
    let object: GetObjectResponse;
    // Use promise to get object from Minio
    object = await new Promise((resolve, reject) => {
      let objectTemp = undefined;
      minioClient.getObject(
        this.configService.get<string>('MINIO_BUCKETNAME'),
        filename,
        function (err, dataStream) {
          if (err) {
            logger
              .emit({
                level: 'error',
                type: 'SYSTEM',
                label: 'minio_get_minio_object',
                message: { message: 'minio get file info failed', error: err },
              })
              .then((value) => console.log(value));
            return console.log(err);
          }
          // Set objectTemp to chunk of data
          dataStream.on('data', function (chunk) {
            objectTemp = chunk;
          });
          // Reject promise on error
          dataStream.on('error', reject);
          // Resolve promise on end
          dataStream.on('end', function () {
            logger
              .emit({
                level: 'info',
                type: 'SYSTEM',
                label: 'minio_get_minio_object',
                message: 'minio get file info successfully',
              })
              .then((value) => console.log(value));
            resolve(objectTemp);
          });
        },
      );
    });
    // Return object
    return object;
  }

  async getPresignUrl(filename: string) {
    // Get the Minio client
    let minioClient = await this.getMinioClient();
    // Create a promise to get the presigned URL
    const url = await new Promise<string>((resolve, reject) => {
      minioClient.presignedUrl(
        'GET',
        this.configService.get<string>('MINIO_BUCKETNAME'),
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

  async listObject() {
    let minioClient = await this.getMinioClient();
    try {
      const stream = minioClient.extensions.listObjectsV2WithMetadata(
        this.configService.get<string>('MINIO_BUCKETNAME'),
        '',
        true,
        '',
      );
      // Handle data event
      stream.on('data', async (obj) => {
        let url = null;
        url = await this.getPresignUrl(obj.name);
        const fileuser = await this.fileUserService.get({
          fileEtag: obj.etag,
        });
        if (fileuser !== null) {
          if (fileuser.name == '' || fileuser.size == 0) {
            this.fileUserService.upload(fileuser.id, {
              name: obj.name,
              url: url,
              lastModified: obj.lastModified,
              size: obj.size,
            });
          }
        }
      });

      // Log success message
      logger
        .emit({
          level: 'info',
          type: 'HTTP',
          label: 'minio_get_file',
          message: 'list object successfull',
        })
        .then((value) => console.log(value));

      return this.fileUserService.getAll();
    } catch (error) {
      // Log error message
      logger
        .emit({
          level: 'error',
          type: 'HTTP',
          label: 'minio_get_file',
          message: { message: 'list object failed', error: error },
        })
        .then((value) => console.log(value));

      throw new HttpException('something went wrong', 500);
    }
  }
}
