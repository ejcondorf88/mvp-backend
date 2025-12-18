import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { Client } from '../client/client.entity';
import { Lote } from '../lote/lote.entity';
import { NftService } from '../nft/nft.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Lote])],
  controllers: [DashboardController],
  providers: [NftService],
})
export class DashboardModule {}
