import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { aplicateGlobalConfiguration, globalAppOptions } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, globalAppOptions);
  aplicateGlobalConfiguration(app);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
