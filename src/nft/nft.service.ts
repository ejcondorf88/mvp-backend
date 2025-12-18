import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class NftService {
  generarHash(datos: any): string {
    const str = JSON.stringify(datos);
    return createHash('sha256').update(str).digest('hex');
  }

  generarQrUrl(tokenId: string): string {
    // Simulación de URL de NFT
    return `https://terralink-nft.com/token/${tokenId}`;
  }
}
