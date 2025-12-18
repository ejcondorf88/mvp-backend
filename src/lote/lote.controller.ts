import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoteService } from './lote.service';
import { Lote } from './lote.entity';

@UseGuards(JwtAuthGuard)
@Controller('lotes')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post()
  create(@Body() body: Partial<Lote>) {
    return this.loteService.create(body);
  }

  @Get()
  findAll() {
    return this.loteService.findAll();
  }
}
