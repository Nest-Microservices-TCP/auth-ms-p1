import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  User,
  FindUsersResponse,
  CreateUserRequest,
  FindOneUserRequest,
  FindUsersByIdsRequest,
  UsersServiceController,
  UsersServiceControllerMethods,
} from 'src/grpc/auth/users.pb';

import { UsersService } from './users.service';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly userService: UsersService) {}

  save(request: CreateUserRequest): void {
    this.userService.save(request);
  }
  findOne(
    request: FindOneUserRequest,
  ): Promise<User> | Observable<User> | User {
    return this.userService.findOne(request);
  }
  find():
    | Promise<FindUsersResponse>
    | Observable<FindUsersResponse>
    | FindUsersResponse {
    return this.userService.find();
  }
  findByIds(
    request: FindUsersByIdsRequest,
  ):
    | Promise<FindUsersResponse>
    | Observable<FindUsersResponse>
    | FindUsersResponse {
    return this.userService.findByIds(request);
  }
}
