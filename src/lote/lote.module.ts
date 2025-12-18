import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lote } from './lote.entity';
import { LoteService } from './lote.service';
import { LoteController } from './lote.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lote])],
  providers: [LoteService],
  controllers: [LoteController],
})
export class LoteModule {}
