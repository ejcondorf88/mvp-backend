import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  razonSocial: string;

  @Column({ unique: true })
  rucNit: string;

  @Column()
  contactoPrincipal: string;

  @Column({ nullable: true })
  legalidadArchivo: string; // Ruta o URL del archivo
}
