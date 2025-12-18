import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create(data: Partial<Client>) {
    const client = this.clientRepository.create(data);
    return this.clientRepository.save(client);
  }

  findAll() {
    return this.clientRepository.find();
  }
}
