import { Injectable } from '@nestjs/common';

@Injectable()
export class EudrService {
  verificarDeforestacion(): 'OK' | 'RIESGO' {
    // Simulación: 80% OK, 20% RIESGO
    return Math.random() < 0.8 ? 'OK' : 'RIESGO';
  }

  calcularScoring(deforestacion: 'OK' | 'RIESGO'): {
    score: number;
    estatus: 'OK' | 'ALERTA';
  } {
    if (deforestacion === 'RIESGO') {
      return { score: 0, estatus: 'ALERTA' };
    }

    const score = 60 + Math.floor(Math.random() * 41);

    return {
      score,
      estatus: score > 80 ? 'OK' : 'ALERTA',
    };
  }
}
