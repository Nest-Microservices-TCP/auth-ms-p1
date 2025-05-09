import { Injectable } from '@nestjs/common';

import {
  FindUsersResponse,
  CreateUserRequest,
  FindOneUserRequest,
} from 'src/grpc/auth/users.pb';

import { UsersRepository } from './repository/users.repository';

import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async save(request: CreateUserRequest): Promise<void> {
    this.usersRepository.save(request);
  }

  async findOne(request: FindOneUserRequest): Promise<User> {
    const { user_id } = request;

    return this.usersRepository.findOne(user_id);
  }

  async find(): Promise<FindUsersResponse> {
    const users = await this.usersRepository.find();

    return { users };
  }
}
