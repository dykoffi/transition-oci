import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { createUserDto } from '../user/dto/create.user.dto';
import { AuthHelper } from './auth.helpers';

@Injectable()
export class AuthService {
  

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor(
    private userService: UserService
    ){}

  public async register(body: createUserDto): Promise<User | never> {
    const { identifier, password }: createUserDto = body;
    let user: User = await this.userService.findOne({ where: { identifier } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    
    let create_user = await this.userService.create({
      identifier:identifier,
      password:this.helper.encodePassword(password)
    })

   
    return create_user;
  }

  public async login(body: createUserDto): Promise<string | never> {
    const { identifier, password }: createUserDto = body;
    const user: User = await this.userService.findOne({ where: { identifier } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.userService.update({
      data:{ lastLoginAt: new Date() },
      where:{id: user.id}
    });

    return this.helper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    this.userService.update({
      data:{ lastLoginAt: new Date() },
      where:{id: user.id}
    });

    return this.helper.generateToken(user);
  }
}