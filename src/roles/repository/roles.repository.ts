import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, FindOptionsWhere, Repository } from 'typeorm';
import { CreateRoleRequest } from 'src/grpc/auth/roles.pb';
import { Role } from '../entity/role.entity';
import { DeleteResultResponse } from 'src/common/dto/response';
import { IRolesRepository } from './interfaces/roles.repository.interface';

export class RolesRepository implements IRolesRepository {
  private rolesRepository: Repository<Role>;

  constructor(
    @InjectRepository(Role)
    private readonly defaultRepository: Repository<Role>,
  ) {
    this.rolesRepository = this.defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.rolesRepository = queryRunner.manager.getRepository(Role);
    } else {
      this.rolesRepository = this.defaultRepository;
    }
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
