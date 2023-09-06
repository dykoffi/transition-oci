import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { PrismaService } from './config/prisma.service';
import * as swaggerStats from 'swagger-stats';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle("Minio upload Api")
    .setDescription("A simple api to upload file into minio")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.use(swaggerStats.getMiddleware({ swaggerSpec: document }));

  SwaggerModule.setup("docs", app, document); 

  app.enableCors({
    origin:"*",
    credentials:true
  });

  
   // prisma shutting down
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
   
  await app.listen(3000);

}
bootstrap();
