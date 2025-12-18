import { UploadModule } from '../upload/upload.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { NftModule } from '../nft/nft.module';
import { EudrModule } from '../eudr/eudr.module';
import { ClimaModule } from '../clima/clima.module';
import { DispositivoModule } from '../dispositivo/dispositivo.module';
import { LoteModule } from '../lote/lote.module';
import { ClientModule } from '../client/client.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';

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
