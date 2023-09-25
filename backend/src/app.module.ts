import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinioModule } from './modules/minio/minio.module';
import { ConfigModule } from '@nestjs/config';
import { FileUserModule } from './modules/fileuser/fileuser.module';
import { AlertingModule } from './modules/alerting/alerting.module';
import { HttpModule } from '@nestjs/axios';
import { ParametreController } from './modules/parametre/parametre.controller';
import { ParametreService } from './modules/parametre/parametre.service';
import { ParametreModule } from './modules/parametre/parametre.module';
import { FormDataModule } from './modules/form_data/form_data.module';
import { ActionModule } from './modules/action/action.module';
import { ActivityLogModule } from './modules/activity_log/activity_log.module';
import { ActivityLogService } from './modules/activity_log/activity_log.service';
@Module({
  imports: [
    /* KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/auth',
      realm: 'gps-realm',
      clientId: 'nest-app',
      secret: 'w9r0OvxiuWJWoCG2OipGWjoMzEtcg9po',
      // Secret key of the client taken from keycloak server
    }), */
    HttpModule.register({
      timeout: 180000,
      maxRedirects: 5,
    }),
    MinioModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FileUserModule,
    AlertingModule,
    ParametreModule,
    FormDataModule,
    ActionModule,
    ActivityLogModule,
  ],
  controllers: [AppController, ParametreController],
  providers: [
    AppService,
    ParametreService,
    ActivityLogService
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    /* {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, */
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and
    // methods with @Scopes
    // are handled by this guard.
    /* {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    }, */
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    /* {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }, */
  ],
})
export class AppModule {}
