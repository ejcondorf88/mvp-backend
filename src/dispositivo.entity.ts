import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Lote } from './lote.entity';

@Entity()
export class Dispositivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dispositivoId: string;

  @Column()
  tipoSensor: string; // Enum: humedad, temperatura, pH

  @ManyToOne(() => Lote)
  @JoinColumn({ name: 'loteId' })
  lote: Lote;

  @Column({ type: 'jsonb', nullable: true })
  ultimaLectura: object; // Mock de datos de suelo
}
