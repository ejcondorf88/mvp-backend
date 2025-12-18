import { Injectable } from '@nestjs/common';

@Injectable()
export class ClimaService {
  consultaHistorica(
    poligonoGeojson: object,
    rangoFechas: {
      desde: string;
      hasta: string;
    },
  ) {
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
