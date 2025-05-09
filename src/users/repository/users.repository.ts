import {
  Repository,
  QueryRunner,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
  EntityNotFoundException,
  FailedRemoveException,
} from 'src/common/exceptions/custom';

import { CreateUserRequest } from 'src/grpc/auth/users.pb';

import { IUsersRepository } from './interfaces/users.repository.interface';

import { User } from '../entity/user.entity';

import { DeleteResultResponse } from 'src/common/dto/response';

export class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor(
    @InjectRepository(User)
    private readonly defaultRepository: Repository<User>,
  ) {
    this.usersRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.usersRepository = queryRunner.manager.getRepository(User);
    } else {
      this.usersRepository = this.defaultRepository;
    }
  }

  find(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(user_id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { user_id },
    });

    if (!user) {
      throw new EntityNotFoundException('user');
    }

    return user;
  }

  create(request: Partial<User>): User {
    return this.usersRepository.create(request);
  }

  save(request: CreateUserRequest): Promise<User> {
    return this.usersRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<User>,
    request: Partial<User>,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ where: conditions });

    Object.assign(user, request);

    return this.usersRepository.save(user);
  }

  async remove(user_id: string): Promise<DeleteResultResponse> {
    await this.findOne(user_id);

    const result: DeleteResult = await this.usersRepository.delete(user_id);

    if (result.affected === 0) {
      throw new FailedRemoveException('user');
    }

    return { deleted: true, affected: result.affected };
  }
}
