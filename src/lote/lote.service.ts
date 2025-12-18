import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from './lote.entity';

@Injectable()
export class LoteService {
  constructor(
    @InjectRepository(Lote)
    private loteRepository: Repository<Lote>,
  ) {}

  create(data: Partial<Lote>) {
    const lote = this.loteRepository.create(data);
    return this.loteRepository.save(lote);
  }

  findAll() {
    return this.loteRepository.find({ relations: ['client'] });
  }
}
