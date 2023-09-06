import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './../../config/prisma.service';
import { Prisma, FileUser } from '@prisma/client';
import { FileUserService } from './fileuser.service';
import { ConfigService } from '@nestjs/config';
 describe('FileUserService', () => {
  let fileUserService: FileUserService;
  let prismaService: PrismaService;
   beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUserService, PrismaService,ConfigService],
    }).compile();
     fileUserService = module.get<FileUserService>(FileUserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
   afterEach(() => {
    jest.restoreAllMocks();
  });
   describe('create', () => {
    it('should create a new file user', async () => {
      // Arrange
      const createInput: Prisma.FileUserCreateInput = {
        id: "d84d70b7-106e-4326-bec8-89d76fa1a46e",
        fileEtag: "27fe0e14-bf4b-4008-80d9-ffcddb373fde",
        userId: "email@test.com",
        createdAt: new Date("02-02-2023"),
        updatedAt: new Date("02-02-2023")
      };
       const createdFileUser: FileUser = {
        id: "d84d70b7-106e-4326-bec8-89d76fa1a46e",
        fileEtag: "27fe0e14-bf4b-4008-80d9-ffcddb373fde",
        userId: "email@test.com",
        createdAt: new Date("02-02-2023"),
        updatedAt: new Date("02-02-2023")
      };
       jest.spyOn(prismaService.fileUser, 'create').mockResolvedValueOnce(
        createdFileUser,
      );
       // Act
      const result = await fileUserService.create(createInput);
       // Assert
      expect(prismaService.fileUser.create).toHaveBeenCalledWith({
        data: createInput,
      });
      expect(result).toEqual(createdFileUser);
    });
  });
});