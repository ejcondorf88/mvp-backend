import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'admin' | 'operador';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'operador' })
  role: UserRole;
}
