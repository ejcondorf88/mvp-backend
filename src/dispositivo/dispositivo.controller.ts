import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Dispositivo } from './dispositivo.entity';
import { Lote } from '../lote/lote.entity';

@Injectable()
export class DispositivoController {
  constructor(
    @InjectRepository(Dispositivo)
    private readonly dispositivoRepo: Repository<Dispositivo>,

    @InjectRepository(Lote)
    private readonly loteRepo: Repository<Lote>,
  ) {}

  async vincular(data: {
    dispositivoId: string;
    tipoSensor: string;
    loteId: number;
  }) {
    const lote = await this.loteRepo.findOne({
      where: { id: data.loteId },
    });

    if (!lote) {
      throw new NotFoundException('Lote no encontrado');
    }

    const dispositivo = this.dispositivoRepo.create({
      dispositivoId: data.dispositivoId,
      tipoSensor: data.tipoSensor,
      lote,
    });

    return this.dispositivoRepo.save(dispositivo);
  }

  findByLote(loteId: number) {
    return this.dispositivoRepo.find({
      where: { lote: { id: loteId } },
    });
  }
}
