import { BaseEntity } from 'src/common/entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User as IUser } from 'src/grpc/auth/users.pb';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Users',
  })
  user_id: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  full_name: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'boolean',
  })
  is_email_verified: boolean;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
  })
  last_login_at: Date;
}
