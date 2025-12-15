import { Injectable } from '@nestjs/common';
import { Lote } from './lote.entity';

@Injectable()
export class EudrService {
  async verificarDeforestacion(poligonoGeojson: object): Promise<'OK' | 'RIESGO'> {
    // Simulación: 80% OK, 20% RIESGO
    return Math.random() < 0.8 ? 'OK' : 'RIESGO';
  }

  async calcularScoring(deforestacion: 'OK' | 'RIESGO', datosClima: any, datosIot: any): Promise<{ score: number; estatus: 'OK' | 'ALERTA' }> {
    if (deforestacion === 'RIESGO') return { score: 0, estatus: 'ALERTA' };
    // Simulación: score entre 60 y 100 si OK
    const score = 60 + Math.floor(Math.random() * 41);
    return { score, estatus: score > 80 ? 'OK' : 'ALERTA' };
  }
}
