import { IBaseRepository } from 'src/common/repository';
import { CreateRoleRequest } from 'src/grpc/auth/roles.pb';
import { Role } from 'src/roles/entity/role.entity';

export interface IRolesRepository
  extends IBaseRepository<Role, CreateRoleRequest> {}
