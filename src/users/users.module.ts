import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repository/users.repository';

import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
