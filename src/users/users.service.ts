import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { CreateUserDto } from './dto/request/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async save(request: CreateUserDto): Promise<void> {
    this.usersRepository.save(request);
  }
}
