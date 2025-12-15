import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispositivo } from './dispositivo.entity';

@Injectable()
export class DispositivoService {
  constructor(
    @InjectRepository(Dispositivo)
    private dispositivoRepository: Repository<Dispositivo>,
  ) {}

  async vincular(data: Partial<Dispositivo>) {
    // Simular una lectura mock
    const lectura = {
      humedad: Math.random() * 100,
      temperatura: 15 + Math.random() * 15,
      pH: 5 + Math.random() * 3,
      fecha: new Date().toISOString(),
    };
    const dispositivo = this.dispositivoRepository.create({ ...data, ultimaLectura: lectura });
    return this.dispositivoRepository.save(dispositivo);
  }

  findByLote(loteId: number) {
    return this.dispositivoRepository.find({ where: { lote: { id: loteId } } });
  }
}
