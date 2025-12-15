import { Injectable } from '@nestjs/common';

@Injectable()
export class ClimaService {
  async consultaHistorica(poligonoGeojson: object, rangoFechas: { desde: string; hasta: string }) {
    // Simulación de consulta a API externa de clima
    // Devuelve datos mock
    return {
      resumen: {
        temperaturaPromedio: 22 + Math.random() * 5,
        precipitacionTotal: 100 + Math.random() * 50,
        fechas: rangoFechas,
      },
      poligono: poligonoGeojson,
    };
  }
}
