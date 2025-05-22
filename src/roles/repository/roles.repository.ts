import { QueryRunner, FindOptionsWhere } from 'typeorm';
import { CreateRoleRequest } from 'src/grpc/auth/roles.pb';
import { Role } from '../entity/role.entity';
import { DeleteResultResponse } from 'src/common/dto/response';
import { IRolesRepository } from './interfaces/roles.repository.interface';

export class RolesRepository implements IRolesRepository {
  setQueryRunner(queryRunner: QueryRunner): void {
    throw new Error('Method not implemented.');
  }
  find(): Promise<Role[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  create(request: Partial<Role>): Role {
    throw new Error('Method not implemented.');
  }
  save(request: CreateRoleRequest): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  update(
    conditions: FindOptionsWhere<Role>,
    request: Partial<Role>,
  ): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<DeleteResultResponse> {
    throw new Error('Method not implemented.');
  }
}
