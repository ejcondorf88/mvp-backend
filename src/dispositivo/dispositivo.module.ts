import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispositivo } from './dispositivo.entity';
import { DispositivoService } from './dispositivo.service';
import { DispositivoController } from './dispositivo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dispositivo])],
  providers: [DispositivoService],
  controllers: [DispositivoController],
})
export class DispositivoModule {}
