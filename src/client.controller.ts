import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ClientService } from './client.service';
import { Client } from './client.entity';

@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() body: Partial<Client>) {
    return this.clientService.create(body);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }
}
