import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Alerting, Prisma, TypeFichier } from '@prisma/client';
import { PrismaService } from './../../config/prisma.service';
import logger from '../../services/logger/logger';

@Injectable()
export class AlertingService {

    constructor(
        private prismaService: PrismaService,
    ){}

    async create(dto:Prisma.AlertingCreateInput): Promise<Alerting> {
      try {
        let creation = this.prismaService.alerting.create({data:dto});
        await logger.emit({level:'info',type:'HTTP',label:"alerting_creation",message:"alerting creation successfull"})
        return creation;
      } catch (error) {
        await logger.emit({level:'error',type:'HTTP',label:"alerting_creation",message:{ùessage:'alerting creation failed',error:error}})
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
          let alerts = this.prismaService.alerting.findMany({...params});
          logger.emit({level:'info',type:'SYSTEM',code:HttpStatus.OK,method:"GET",label:"alerting-get",message:"operation successfull"}).then(value=>console.log(value)
          );
          return alerts;
        } catch (error) {
          logger.emit({level:'error',type:'SYSTEM',code:HttpStatus.BAD_REQUEST,method:"GET",label:"alerting-get",message:error}).then(value=>console.log(value)
          );
        }
    }
    
    async update(params: {
        data: Prisma.AlertingUpdateInput;
        where: Prisma.AlertingWhereUniqueInput;
      }): Promise<Alerting> {
        try {
          let alert = this.prismaService.alerting.update(params);
          logger.emit({level:'info',type:'SYSTEM',code:HttpStatus.OK,method:"PATCH",label:"alerting-update",message:"operation successfull"}).then(value=>console.log(value)
          );

          return alert;
        } catch (error) {
          logger.emit({level:'error',type:'SYSTEM',code:HttpStatus.BAD_REQUEST,method:"PATCH",label:"alerting-update",message:error}).then(value=>console.log(value)
          );

        }
        
    }

    async delete(params:{
        where: Prisma.AlertingWhereUniqueInput;
      }): Promise<Alerting>{
        try {
          let alert = await this.prismaService.alerting.delete(params);
          logger.emit({level:'info',type:'SYSTEM',code:HttpStatus.OK,method:"DELETE",label:"alerting-delete",message:"operation successfull"}).then(value=>console.log(value)
          );

          return alert;

        } catch (error) {
          logger.emit({level:'error',type:'SYSTEM',code:HttpStatus.BAD_REQUEST,method:"DELETE",label:"alerting-delete",message:error}).then(value=>console.log(value)
          );

        }
    }

}
