import { Test, TestingModule } from '@nestjs/testing';
import { AlertingController } from './alerting.controller';
import { AlertingService } from './alerting.service';
import { createAlertingDto } from './dto/create.alerting.dto';
import { UpdateOpexDto } from './dto/update.alerting.dto';
import { Alerting, TypeFichier } from '@prisma/client';
import { PrismaService } from './../../config/prisma.service';
import { ConfigService } from '@nestjs/config';
describe('AlertingController', () => {
  let controller: AlertingController;
  let alertingService: AlertingService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertingController],
      providers: [AlertingService,PrismaService,ConfigService],
    }).compile();
    controller = module.get<AlertingController>(AlertingController);
    alertingService = module.get<AlertingService>(AlertingService);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('create', () => {
    it('should create a new alerting', async () => {
      // Arrange
      const createAlertingDto: createAlertingDto = {
        email: ['test@email.com'],
        telephone: ['0101278963'],
        typeFichier: TypeFichier.CA_SITES,
      };
      const alert: Alerting = {
        id: '27fe0e14-bf4b-4008-80d9-ffcddb373fde',
        email: ['test@email.com'],
        telephone: ['0101278963'],
        typeFichier: TypeFichier.CA_SITES,
        createdAt: new Date('02-02-2023'),
        updatedAt: new Date('02-02-2023'),
      };
      jest.spyOn(alertingService, 'create').mockResolvedValueOnce(alert);
      // Act
      const result = await controller.create(createAlertingDto);
      // Assert
      expect(alertingService.create).toHaveBeenCalledWith(createAlertingDto);
      expect(result).toEqual(alert);
    });
  });
  describe('getAll', () => {
    it('should return all alerting', async () => {
      // Arrange
      const alert: Alerting[] = [
        // provide expected output data for getAll
      ];
      jest.spyOn(alertingService, 'getAlert').mockResolvedValueOnce(alert);
      // Act
      const result = await controller.getAll();
      // Assert
      expect(alertingService.getAlert).toHaveBeenCalled();
      expect(result).toEqual(alert);
    });
  });
  describe('update', () => {
    it('should update an existing alerting', async () => {
      // Arrange
      const updateOpexDto: UpdateOpexDto = {
        email: ['test@email.com'],
        telephone: ['0101278963'],
        typeFichier: TypeFichier.BASE_SITES,
      };
      const alert: Alerting = {
        id: '27fe0e14-bf4b-4008-80d9-ffcddb373fde',
        email: ['test@gmail.com'],
        telephone: ['0102278963'],
        typeFichier: TypeFichier.BASE_SITES,
        createdAt: new Date('02-02-2023'),
        updatedAt: new Date('02-02-2023'),
      };
      const id = '27fe0e14-bf4b-4008-80d9-ffcddb373fde';
      jest.spyOn(alertingService, 'update').mockResolvedValueOnce(alert);
      // Act
      const result = await controller.update(id, updateOpexDto);
      // Assert
      expect(alertingService.update).toHaveBeenCalledWith({
        where: { id },
        data: updateOpexDto,
      });
      expect(result).toEqual(alert);
    });
  });
  describe('delete', () => {
    it('should delete an existing alerting', async () => {
      // Arrange
      const id = '27fe0e14-bf4b-4008-80d9-ffcddb373fde';
      const alert: Alerting = {
        id: '27fe0e14-bf4b-4008-80d9-ffcddb373fde',
        email: ['test@gmail.com'],
        telephone: ['0102278963'],
        typeFichier: TypeFichier.BASE_SITES,
        createdAt: new Date('02-02-2023'),
        updatedAt: new Date('02-02-2023'),
      };
      jest.spyOn(alertingService, 'delete').mockResolvedValueOnce(alert);
      // Act
      const result = await controller.delete(id);
      // Assert
      expect(alertingService.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(alert);
    });
  });
});
