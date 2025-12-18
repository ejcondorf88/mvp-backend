import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EudrService } from './eudr.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('eudr')
export class EudrController {
  constructor(private readonly eudrService: EudrService) {}

  @Post('verificar-deforestacion')
  async verificar(
    @Body()
    body: {
      poligonoGeojson: object;
    },
  ) {
    const estado = await this.eudrService.verificarDeforestacion(
      body.poligonoGeojson,
    );

    return {
      estadoDeforestacion: estado,
    };
  }

  @Post('scoring')
  async scoring(
    @Body()
    body: {
      deforestacion: 'OK' | 'RIESGO';
      datosClima: unknown;
      datosIot: unknown;
    },
  ) {
    return this.eudrService.calcularScoring(
      body.deforestacion,
      body.datosClima,
      body.datosIot,
    );
  }
}
