import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ClimaService } from './clima.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('clima')
export class ClimaController {
  constructor(private readonly climaService: ClimaService) {}

  @Post('consulta-historica')
  consultaHistorica(
    @Body()
    body: {
      poligonoGeojson: object;
      desde: string;
      hasta: string;
    },
  ) {
    return this.climaService.consultaHistorica(body.poligonoGeojson, {
      desde: body.desde,
      hasta: body.hasta,
    });
  }
}
