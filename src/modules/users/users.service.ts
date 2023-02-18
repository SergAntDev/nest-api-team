import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { CreateUserDto } from './dto/user-create.req.dto';
import { UpdateUserDto } from './dto/user-update.req.dto';
import { SqlErrorCode } from 'db/enum/errorCodes.enum';
import { User } from './users.entity';
import { Profiles } from '../profiles/profiles.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profiles)
    private profilesRepository: Repository<Profiles>,
  ) {}

  async create(newUser: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create();
    user.firstName = newUser.firstName;
    user.secondName = newUser.secondName;
    user.email = newUser.email;
    user.password = newUser.password;

    try {
      if (
        newUser?.profile &&
        Object.keys(newUser?.profile)?.length !== 0 &&
        newUser?.profile?.constructor === Object
      ) {
        const newProfile = this.profilesRepository.create();
        const { phone, slackId, position, department, birthDate, hiredDate } =
          newUser.profile;
        const savedProfile = await this.profilesRepository.save({
          ...newProfile,
          phone,
          slackId,
          position,
          department,
          birthDate,
          hiredDate,
        });
        user.profile = savedProfile;
      }

      return await this.usersRepository.save(user);
    } catch (error) {
      if (error?.code === SqlErrorCode.DUPLICATE_ENTRY) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(options: FindOneOptions): Promise<User | undefined> {
    return await this.usersRepository.findOne(options);
  }

  async update(id: string, data: UpdateUserDto): Promise<User | undefined> {
    try {
      const user = await this.getUser({ where: { id } });
      if (user) {
        const { firstName, secondName, email } = data;
        const updatedUser = await this.usersRepository.save({
          ...user,
          firstName,
          secondName,
          email,
        });
        if (
          data?.profile &&
          Object.keys(data?.profile)?.length !== 0 &&
          data?.profile?.constructor === Object
        ) {
          const currentProfile = await this.profilesRepository.findOne({
            where: { id: user.profile.id },
          });

          const { phone, slackId, position, department, birthDate, hiredDate } =
            data.profile;
          const savedProfile = await this.profilesRepository.save({
            ...currentProfile,
            phone,
            slackId,
            position,
            department,
            birthDate,
            hiredDate,
          });
          updatedUser.profile = savedProfile;
        }
        return updatedUser;
      }
      throw new HttpException(
        'A user with given id does not exist.',
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      if (error) {
        throw error;
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number | string): Promise<any> {
    try {
      const user = await this.getUser({ where: { id } });
      if (user) {
        await this.usersRepository.delete(id);
        return {
          statusCode: 200,
          message: 'User was deleted',
        };
      }

      throw new HttpException(
        'A user with given id does not exist.',
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      if (error) {
        throw error;
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
