import { Module } from '@nestjs/common';
import { EudrService } from './eudr.service';
import { EudrController } from './eudr.controller';

@Module({
  providers: [EudrService],
  controllers: [EudrController],
})
export class EudrModule {}
