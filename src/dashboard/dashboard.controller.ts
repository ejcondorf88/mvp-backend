import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../client/client.entity';
import { Lote } from '../lote/lote.entity';
import { NftService } from '../nft/nft.service';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    @InjectRepository(Lote) private loteRepo: Repository<Lote>,
    private nftService: NftService,
  ) {}

  @Get('summary')
  async summary() {
    const totalClientes = await this.clientRepo.count();
    const totalLotes = await this.loteRepo.count();
    // Simulación: NFTs generados = lotes con hash NFT (en este MVP, igual a totalLotes)
    const totalNfts = totalLotes;
    return {
      totalClientes,
      totalLotes,
      totalNfts,
    };
  }
}
