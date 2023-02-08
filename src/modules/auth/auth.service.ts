import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/user-create.req.dto';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ where: { email } });

    if (!user) throw new BadRequestException();

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException();

    return user;
  }

  async login(user: User) {
    delete user.password;
    const data = {
      user,
    };

    return {
      access_token: this.jwtService.sign(data),
    };
  }

  async register(newUser: CreateUserDto): Promise<User> {
    return this.usersService.create(newUser);
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
