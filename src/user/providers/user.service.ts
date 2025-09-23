import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { DB_CONNECTION_ERROR } from 'src/common/system-message';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);

      await this.userRepository.save(user);

      return user;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }

  async checkUserExistByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException();
      }

      return user;
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: DB_CONNECTION_ERROR,
      });
    }
  }
}
