import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { DB_CONNECTION_ERROR } from 'src/common/system-message';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/providers/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/model/user.entity';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  async signup(registerDto: RegisterDto) {
    try {
      await this.userService.checkUserExistByEmail(registerDto.email);
      const hashedPassword = await this.hashPassword(registerDto.password);

      const user = await this.userService.createUser({
        ...registerDto,
        password: hashedPassword,
      });

      const token = await this.generateAccessToken(user);

      return {
        access_token: token,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }

  async signin(loginDto: LoginDto) {
    try {
      const user = await this.userService.checkUserExistByEmail(loginDto.email);

      const passwordVerified = await this.comparePassword(
        loginDto.password,
        user.password,
      );

      if (!passwordVerified) {
        throw new UnauthorizedException();
      }

      const token = this.generateAccessToken(user);

      return {
        access_token: token,
      };
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }

  async generateAccessToken(user: User) {
    const payload = {
      sub: user.id,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRY'),
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return token;
  }

  async hashPassword(data: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(data, salt);
  }

  async comparePassword(data: string, hashedPassword: string) {
    return bcrypt.compare(data, hashedPassword);
  }
}
