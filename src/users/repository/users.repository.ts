import { DeleteResultResponse } from 'src/common/dto/response';
import { CreateRateRequest } from 'src/grpc/rooms/rates.pb';
import { QueryRunner, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { IUsersRepository } from './interfaces/users.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

export class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor(
    @InjectRepository(User)
    private readonly defaultRepository: Repository<User>,
  ) {
    this.usersRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    throw new Error('Method not implemented.');
  }

  find(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  create(request: Partial<User>): User {
    throw new Error('Method not implemented.');
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
