import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import type { Request } from 'express';
import type { Multer } from 'multer';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  @Post('legalidad')
  @UseInterceptors(
    FileInterceptor('file', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      storage: diskStorage({
        destination: './uploads',
        filename: (
          _req: Request,
          file: Multer.File,
          cb: (error: Error | null, filename: string) => void,
        ) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);

          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Multer.File): { url: string } {
    return {
      url: `/uploads/${file.filename}`,
    };
  }
}
