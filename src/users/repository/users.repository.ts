import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRateRequest } from 'src/grpc/rooms/rates.pb';
import { QueryRunner, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { IUsersRepository } from './interfaces/users.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/common/exceptions/custom';

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

  save(request: CreateRateRequest): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(
    conditions: FindOptionsWhere<User>,
    request: Partial<User>,
  ): Promise<User> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<DeleteResultResponse> {
    throw new Error('Method not implemented.');
  }
}
