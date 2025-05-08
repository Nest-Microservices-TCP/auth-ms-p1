import { IBaseRepository } from 'src/common/repository';
import { CreateUserRequest } from 'src/grpc/auth/users.pb';
import { User } from 'src/users/entity/user.entity';

export interface IUsersRepository
  extends IBaseRepository<User, CreateUserRequest> {}
