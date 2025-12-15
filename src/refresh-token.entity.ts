import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'timestamp' })
  expires: Date;
}
