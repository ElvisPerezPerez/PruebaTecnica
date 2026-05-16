import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return ` ${process.env.NODE_ENV} ${process.env.SUPABASE_URL}` || 'No se pudo acceer ';
  }
}
