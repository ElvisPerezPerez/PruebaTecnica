import {
  NestApplicationOptions,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

export const globalAppOptions: NestApplicationOptions = {
  bufferLogs: true,
};

export function aplicateGlobalConfiguration(app: INestApplication) {
  app.use(cookieParser());
  // Documentation
  const config = new DocumentBuilder()
    .setTitle('Prueba')
    .setDescription('Prueba')
    .setVersion('0.0.0')
    .addTag('Prueba')
    .addGlobalResponse({
      status: 500,
      description: 'Internal server error',
    })
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addSecurity('JWT-auth', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.security = [{ 'JWT-auth': [] }];

  SwaggerModule.setup('doc', app, document);

  app.use(helmet());

  const allowedOriginsMap: Record<string, true> = {
    'http://localhost:3000': true,
    'http://localhost:3001': true,
    'http://localhost:5173': true,
    'http://localhost': true,
  };

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      const normalized = String(origin).replace(/\/$/, '');
      if (allowedOriginsMap[normalized]) {
        callback(null, true);
      } else {
        callback(new UnauthorizedException('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      errorHttpStatusCode: 422,
    }),
  );
}
