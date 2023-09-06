import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeFichier } from '@prisma/client';

describe('all e2e test', () => {
  let app: INestApplication;
  let alertingId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('MINIO API');
    });


    it('/alerting (POST)', async () => {
      const res = await request(app.getHttpServer())
        .post('/alerting')
        .send({
          typeFichier: TypeFichier.BASE_SITES,
          email: ['test@email.com'],
          telephone: ['0707896541'],
        })
        .expect(HttpStatus.CREATED);
      console.log("res",res);
      

      expect(res.body).toHaveProperty('id');
      alertingId = res.body.id;
    });

    /* it('/alerting (GET)', async () => {
      const res = await request(app.getHttpServer())
        .get('/alerting')
        .expect(HttpStatus.OK);

      expect(Array.isArray(res.body)).toBeTruthy();

      const createdAlert = res.body.find((alert) => alert.id === alertingId);
      expect(createdAlert).toBeDefined();
      expect(createdAlert.typeFichier).toBe(TypeFichier.BASE_SITES);
      expect(createdAlert.email).toBe(['test@email.com']);
      expect(createdAlert.telephone).toBe(['0707896541']);
    });

    it('/alerting/:id (PATCH)', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/alerting/${alertingId}`)
        .send({
          email: ['test2@email.com'],
          telephone: ['0707896541'],
        })
        .expect(HttpStatus.OK);

      expect(res.body).toHaveProperty('id', alertingId);
      expect(res.body.email).toBe(['test2@email.com']);
      expect(res.body.telephone).toBe(['0707896541']);
    });

    it('/alerting/:id (DELETE)', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/alerting/${alertingId}`)
        .expect(HttpStatus.OK);

      expect(res.body).toHaveProperty('id', alertingId);

      const check = await request(app.getHttpServer())
        .get('/alerting')
        .expect(HttpStatus.OK);

      const deletedAlert = check.body.find((alert) => alert.id === alertingId);
      expect(deletedAlert).toBeUndefined();
    }); */

});
