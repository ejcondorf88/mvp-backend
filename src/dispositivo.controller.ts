import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { DispositivoService } from './dispositivo.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('dispositivos')
export class DispositivoController {
  constructor(private readonly dispositivoService: DispositivoService) {}

  @Post('vincular')
  vincular(@Body() body: { dispositivoId: string; tipoSensor: string; loteId: number }) {
    return this.dispositivoService.vincular({
      dispositivoId: body.dispositivoId,
      tipoSensor: body.tipoSensor,
      lote: { id: body.loteId } as any,
    });
  }

  @Get('por-lote')
  findByLote(@Query('loteId') loteId: number) {
    return this.dispositivoService.findByLote(loteId);
  }
}
