import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Lote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @Column()
  producto: string; // Enum: Café, Cacao, Soja, etc.

  @Column({ type: 'jsonb' })
  poligonoGeojson: object;

  @Column({ type: 'date' })
  fechaProduccion: string;
}
