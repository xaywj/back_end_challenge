import { Delete } from '@nestjs/common';
import { Role } from 'src/app/role/entities/role.entity'; 
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true})
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date; 

  @ManyToOne(() => Role, (role) => role.user, { cascade: true })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id'})
  role: Role;
}
