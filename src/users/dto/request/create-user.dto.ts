import { CreateUserRequest } from 'src/grpc/auth/users.pb';

export class CreateUserDto implements CreateUserRequest {
  nickname: string;
  email: string;
  password: string;
  full_name: string;
}
