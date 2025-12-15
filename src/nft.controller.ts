import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { NftService } from './nft.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('lote')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post(':id/generate-nft')
  generarNft(@Param('id') id: number, @Body() body: any) {
    // body debe incluir los datos de cumplimiento: ID_Lote, RUC, Polígono, Resultado Deforestación, Resumen IoT/Clima
    const tokenId = this.nftService.generarHash({ id, ...body });
    const url = this.nftService.generarQrUrl(tokenId);
    return { tokenId, url };
  }
}
