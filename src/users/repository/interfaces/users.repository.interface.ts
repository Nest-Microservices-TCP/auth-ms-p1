import { IBaseRepository } from 'src/common/repository';
import { CreateRateRequest } from 'src/grpc/rooms/rates.pb';
import { User } from 'src/users/entity/user.entity';

export interface IUsersRepository
  extends IBaseRepository<User, CreateRateRequest> {}
