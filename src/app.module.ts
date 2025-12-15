import { UploadModule } from './upload.module';
import { DashboardModule } from './dashboard.module';
import { NftModule } from './nft.module';
import { EudrModule } from './eudr.module';
import { ClimaModule } from './clima.module';
import { DispositivoModule } from './dispositivo.module';
import { LoteModule } from './lote.module';
import { ClientModule } from './client.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Cambia por tu usuario
      password: 'postgres', // Cambia por tu contraseña
      database: 'terralink', // Cambia por tu base de datos
      autoLoadEntities: true,
      synchronize: true, // Solo para desarrollo
    }),
    AuthModule,
    ClientModule,
    LoteModule,
    DispositivoModule,
    ClimaModule,
    EudrModule,
    NftModule,
    DashboardModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
