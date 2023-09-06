import { Test, TestingModule } from '@nestjs/testing';
import { AlertingService } from './alerting.service';
import { PrismaService } from './../../config/prisma.service';
import { Alerting, TypeFichier } from '@prisma/client';
import logger from './../../services/logger/logger';
import { ConfigService } from '@nestjs/config';

jest.setTimeout(10000);

describe('AlertingService', () => {
  let alertingService: AlertingService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertingService, PrismaService, ConfigService],
    }).compile();
    alertingService = module.get<AlertingService>(AlertingService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('create', () => {
    it('should create a new alerting', async () => {
      // Arrange
      const createInput = {
        id: '27fe0e14-bf4b-4008-80d9-ffcddb373fde',
        email: ['test@email.com'],
        telephone: ['0585749632'],
        typeFichier: TypeFichier.BASE_SITES,
        createdAt: new Date('02-02-2023'),
        updatedAt: new Date('02-02-2023'),
      };
      const createdAlerting: Alerting = {
        id: '27fe0e14-bf4b-4008-80d9-ffcddb373fde',
        email: ['test@email.com'],
        telephone: ['0585749632'],
        typeFichier: TypeFichier.BASE_SITES,
        createdAt: new Date('02-02-2023'),
        updatedAt: new Date('02-02-2023'),
      };
      const loggerSpy = jest.spyOn(logger, 'emit').mockResolvedValueOnce();
      jest
        .spyOn(prismaService.alerting, 'create')
        .mockResolvedValueOnce(createdAlerting);
      // Act
      const result = await alertingService.create(createInput);
      // Assert
      expect(prismaService.alerting.create).toHaveBeenCalledWith({
        data: createInput,
      });
      expect(loggerSpy).toHaveBeenCalledWith({
        level: 'info',
        type: 'HTTP',
        label: 'alerting_creation',
        message: 'alerting creation successfull',
      });
      expect(result).toEqual(createdAlerting);
    });
  });

  describe('getAlert', () => {
    it('should return array of alerting', async () => {
      // Arrange
      const params = {
        skip: 0,
        take: 10,
        where: {},
        orderBy: {},
      };
      const alerts: Alerting[] = [
        // provide expected output data for getAlert
      ];
      jest.spyOn(prismaService.alerting, 'findMany').mockResolvedValueOnce(alerts);

      // Act
      const result = await alertingService.getAlert(params);

      // Assert
      expect(prismaService.alerting.findMany).toHaveBeenCalledWith(params);
      expect(result).toEqual(alerts);
    });
  });


  describe('update', () => {
    it('should update an existing alerting', async () => {
      // Arrange
      const updateInput = {
        data: {
          id: 'a47d31e5-ee04-490e-b479-7c7f50459015',
          email: ['test2@test.com'],
          telephone: ['0585749632','2225588960'],
          typeFichier: TypeFichier.ACTION_TECH,
          updatedAt: new Date('02-04-2023'),
        },
        where: {
          id:"a47d31e5-ee04-490e-b479-7c7f50459015"
        },
      };
      const updatedAlerting: Alerting = {
        id: 'a47d31e5-ee04-490e-b479-7c7f50459015',
        email: ['test2@test.com'],
        telephone: ['0585749632','2225588960'],
        typeFichier: TypeFichier.ACTION_TECH,
        createdAt: new Date('02-02-2023'),
        updatedAt: new Date('02-04-2023'),
      };
      const loggerSpy = jest.spyOn(logger, 'emit').mockResolvedValueOnce();
       jest.spyOn(prismaService.alerting, 'update').mockResolvedValueOnce(
        updatedAlerting,
      );
       // Act
      const result = await alertingService.update(updateInput);
       // Assert
      expect(prismaService.alerting.update).toHaveBeenCalledWith(updateInput);
      expect(loggerSpy).toHaveBeenCalledWith({
        level: 'info',
        type: 'SYSTEM',
        code: expect.any(Number),
        method: 'PATCH',
        label: 'alerting-update',
        message: 'operation successfull',
      });
      expect(result).toEqual(updatedAlerting);
    });
  })

  describe('delete', () => {
    it('should delete an existing alerting', async () => {
      // Arrange
      const where = {
        id:"a47d31e5-ee04-490e-b479-7c7f50459015"
      };
      const deletedAlerting: Alerting = {
        id: 'a47d31e5-ee04-490e-b479-7c7f50459015',
        email: ['test2@test.com'],
        telephone: ['0585749632','2225588960'],
        typeFichier: TypeFichier.ACTION_TECH,
        createdAt: new Date('02-02-2023'),
        updatedAt: new Date('02-04-2023'),
      };
      const loggerSpy = jest.spyOn(logger, 'emit').mockResolvedValueOnce();
       jest.spyOn(prismaService.alerting, 'delete').mockResolvedValueOnce(
        deletedAlerting,
      );
       // Act
      const result = await alertingService.delete({ where });
       // Assert
      expect(prismaService.alerting.delete).toHaveBeenCalledWith({ where });
      expect(loggerSpy).toHaveBeenCalledWith({
        level: 'info',
        type: 'SYSTEM',
        code: expect.any(Number),
        method: 'DELETE',
        label: 'alerting-delete',
        message: 'operation successfull',
      });
      expect(result).toEqual(deletedAlerting);
    });

  });
});
