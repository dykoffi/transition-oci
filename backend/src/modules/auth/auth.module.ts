import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthHelper } from './auth.helpers';
import { PrismaModule } from '../../config/prisma.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_KEY'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES') },
      }),
    }),
    UserModule,
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, JwtStrategy,UserService],
})

export class AuthModule {}