import { BaseEntity } from 'src/common/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role as IRole } from 'src/grpc/auth/roles.pb';

@Entity({ name: 'roles' })
export class Role extends BaseEntity implements IRole {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Roles',
  })
  role_id: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;
}
