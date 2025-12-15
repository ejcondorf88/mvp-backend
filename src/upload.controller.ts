import { Controller, Post, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  @Post('legalidad')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + extname(file.originalname));
      }
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/${file.filename}` };
  }
}
